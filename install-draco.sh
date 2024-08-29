#!/bin/bash

DRACO_PYODIDE_VERSION=2.0.1
ARTIFACT_DIR=public/artifacts
TAR_NAME=pyodide-$DRACO_PYODIDE_VERSION.tar.gz
WHEEL_FILE=$ARTIFACT_DIR/draco-$DRACO_PYODIDE_VERSION-py3-none-any.whl

if [ ! -f "$WHEEL_FILE" ]; then
    curl -L -o $TAR_NAME https://github.com/cmudig/draco2/releases/download/v$DRACO_PYODIDE_VERSION/$TAR_NAME
    mkdir -p $ARTIFACT_DIR
    tar -xzf $TAR_NAME --directory $ARTIFACT_DIR
    rm $TAR_NAME
else
    echo "Draco $DRACO_PYODIDE_VERSION already exists. Skipping download."
fi