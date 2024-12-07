FROM quay.io/lyfe00011/md:beta
RUN git clone https://github.com/PeaseErnest12287/bot4.git /root/LyFE/
WORKDIR /root/LyFE/
RUN yarn install
CMD ["npm", "start"]
