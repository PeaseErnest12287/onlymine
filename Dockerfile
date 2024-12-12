# Use a base image
FROM quay.io/lyfe00011/md:beta

# Clone your GitHub repository into a new folder /root/OnlyMine
RUN git clone https://github.com/PeaseErnest12287/onlymine.git /root/OnlyMine/

# Set the working directory to where the repository is cloned
WORKDIR /root/OnlyMine/

# Install dependencies using yarn (assuming the repository has a yarn.lock file)
RUN yarn install

# Set the default command to run when the container starts (assuming it's a Node.js app)
CMD ["npm", "start"]
