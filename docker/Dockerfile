FROM ubuntu:16.04

RUN \
    apt-get update && apt-get install -y build-essential \
    cmake python2.7 python nodejs-legacy default-jre git-core curl && \
    apt-get clean && \
\
    cd ~/ && \
    git clone https://github.com/juj/emsdk.git && \
    cd emsdk && \
    ./emsdk install latest && \
    ./emsdk activate latest && \
\
    rm -rf ~/emsdk/clang/tag-*/src && \
    find . -name "*.o" -exec rm {} \; && \
    find . -name "*.a" -exec rm {} \; && \
    find . -name "*.tmp" -exec rm {} \; && \
    find . -type d -name ".git" -prune -exec rm -rf {} \; && \
\
    apt-get -y --purge remove curl git-core cmake && \
    apt-get -y autoremove && apt-get clean && \
\
    ln -s /root/emsdk/emscripten/1.38.11/emcc /usr/bin/emcc && \
    bash ~/emsdk/emsdk_env.sh --build=Release

# http://docs.docker.com/engine/reference/run/#workdir
WORKDIR /home/src