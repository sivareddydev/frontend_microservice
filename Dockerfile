FROM centos:7
RUN yum install -y curl sudo

RUN sudo yum install -y gcc-c++ make

RUN curl -sL https://rpm.nodesource.com/setup | bash -
RUN yum install -y nodejs

ADD . /opt/app-root/src/

WORKDIR /opt/app-root/src

RUN ["/bin/bash", "-c", "npm install"]

EXPOSE 8080

CMD /bin/bash -c 'npm start'

