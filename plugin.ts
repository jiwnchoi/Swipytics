import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

interface PyodidePluginOptions {
  base: string;
  entryPoint?: string;
}

function pyodidePlugin(options: PyodidePluginOptions): Plugin {
  const virtualModuleId = "virtual:pyodide-files";
  const resolvedVirtualModuleId = `\0${virtualModuleId}`;

  // Move pythonFiles inside the plugin function
  let pythonFiles: Record<string, string> = {};

  const loadPythonFilesRecursively = (dir: string, baseDir: string) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      const relativePath = path.relative(path.dirname(baseDir), filePath);
      if (file.isDirectory()) {
        loadPythonFilesRecursively(filePath, baseDir);
      } else if (file.isFile() && file.name.endsWith(".py")) {
        const content = fs.readFileSync(filePath, "utf-8");
        pythonFiles[relativePath] = content;
      }
    }
  };

  const loadPythonFiles = () => {
    const basePath = path.resolve(options.base);
    pythonFiles = {}; // Reset pythonFiles before loading
    loadPythonFilesRecursively(basePath, basePath);
    return pythonFiles; // Return the updated pythonFiles
  };

  return {
    name: "vite-plugin-pyodide",

    handleHotUpdate({ file, server }) {
      if (file.endsWith(".py")) {
        loadPythonFiles();
        server.ws.send({ type: "full-reload" });

        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }
      }
    },

    buildStart() {
      loadPythonFiles();
    },

    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },

    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        // Call loadPythonFiles() here to get the latest content
        const files = loadPythonFiles();
        const baseName = path.basename(options.base);
        const entryPointFullPath = options.entryPoint
          ? path.join(baseName, options.entryPoint)
          : "";
        const entryPointContent = entryPointFullPath ? files[entryPointFullPath] : "";

        return `
          export async function setupPyodideFiles(pyodide) {
            const files = ${JSON.stringify(files)};
            for (const [filename, content] of Object.entries(files)) {
              const dirs = filename.split('/').slice(0, -1);
              let currentDir = '';
              for (const dir of dirs) {
                currentDir = currentDir ? \`\${currentDir}/\${dir}\` : dir;
                try {
                  pyodide.FS.mkdir(currentDir);
                } catch (e) {
                  // Directory might already exist, ignore the error
                }
              }
              pyodide.FS.writeFile(filename, content);
            }
          }

          export function runEntryPoint(pyodide) {
            const entryPointContent = ${JSON.stringify(entryPointContent)};
            if (entryPointContent) {
              pyodide.runPython(entryPointContent);
            }
          }

          export async function runEntryPointAsync(pyodide) {
            const entryPointContent = ${JSON.stringify(entryPointContent)};
            if (entryPointContent) {
              await pyodide.runPythonAsync(entryPointContent);
            }
          }
        `;
      }
    },
  };
}

export default pyodidePlugin;
