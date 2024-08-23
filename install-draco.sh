DRACO_PYODIDE_VERSION=2.0.1
ARTIFACT_DIR=public/artifacts
TAR_NAME=pyodide-$DRACO_PYODIDE_VERSION.tar.gz
curl -L -o $TAR_NAME https://github.com/cmudig/draco2/releases/download/v$DRACO_PYODIDE_VERSION/$TAR_NAME
mkdir $ARTIFACT_DIR
tar -xzf $TAR_NAME --directory $ARTIFACT_DIR
rm $TAR_NAME