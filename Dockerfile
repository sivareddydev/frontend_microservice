FROM centos:7

RUN yum install -y curl sudo wget
RUN sudo yum install -y gcc-c++ make
ARG GIT_COMMIT_ID
ARG NVM_VERSION=0.33.11
ARG NODE_LTS=8.11.1
ARG NODE_OLD_LTS=6.14.2
ARG NODE_CURRENT=10.1.0

RUN mkdir -p /tools /tools-copy; \
     wget -O - https://codeload.github.com/creationix/nvm/tar.gz/v0.33.11 \
    | tar -xzvC /tools-copy \
    && ln -s /tools-copy/nvm-${NVM_VERSION} /tools-copy/nvm;

RUN export NVM_DIR="/tools-copy/nvm-${NVM_VERSION}"; \
    source ${NVM_DIR}/nvm.sh \
    && nvm install ${NODE_LTS}; \
    nvm install ${NODE_OLD_LTS}; \
    nvm install ${NODE_CURRENT} \
    || :  
ADD . /opt/app-root/src/

WORKDIR /opt/app-root/src
USER root

VOLUME "/tools"

CMD cp -r /tools-copy/nvm/versions/node/v${NODE_VERSION}/* /tools/


RUN ["/bin/bash", "-c", "/tools/npm install"]

EXPOSE 8085

CMD /bin/bash -c '/tools/npm start'


