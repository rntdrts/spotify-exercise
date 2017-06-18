# spotify-exercise

[![CircleCI](https://circleci.com/gh/rntdrts/spotify-exercise/tree/master.svg?style=svg)](https://circleci.com/gh/rntdrts/spotify-exercise/tree/master)

You can find the project [here](http://ec2-34-211-64-117.us-west-2.compute.amazonaws.com/).

## Requirements
* Ansible
* Docker

## Setup
### ansible
```bash
cd $PROJECT_HOME //directory to where the project was extract/clone
export ANSIBLE_CONFIG=$(pwd)/ansible/ansible.cfg
export ANSIBLE_HOSTS=$(pwd)/ansible/hosts
ansible-galaxy install -r requirements.yml
ansible-playbook ansible/container.yml
ansible-playbook ansible/provisioning.yml
```

### Development
```bash
sudo docker exec -it spotify-example /bin/bash -c 'cd /srv/spotify-example/current && yarn api'
sudo docker exec -it spotify-example /bin/bash -c 'cd /srv/spotify-example/current && yarn start'
```
