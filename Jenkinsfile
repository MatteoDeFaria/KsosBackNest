#!/usr/bin/env/ groovy
pipeline {
    agent { node { label 'pi5' } }

    environment {
        registryCredential = 'docker-hub-credentials'
        REGISTRY = 'tekmatteo/ksos-back'
        CONTAINER_NAME = 'KsosBack'
        SALT_ROUND = credentials('salt-round')
        DATABASE_URL = credentials('database-url')
        RIOT_API_KEY = credentials('riot-api-key')
    }

    stages {
        stage('Stop and clean up old latest Docker Image') {
            steps {
                script {
                    oldContainerId = sh(script: "docker ps -a -q -f name=$CONTAINER_NAME", returnStdout: true)
                    oldImageId = sh(script: "docker images -qf reference=$REGISTRY:latest", returnStdout: true)

                    if (oldContainerId != '') {
                        sh "docker stop $CONTAINER_NAME"
                        sh "docker rm $CONTAINER_NAME"
                    } else {
                        echo "No container to delete..."
                    }

                    if (oldImageId != '') {
                        sh "docker rmi $registry:latest"
                    } else {
                        echo "No image to delete..."
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build "$REGISTRY:$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Clean up Docker Image') {
            steps {
                sh "docker rmi $REGISTRY:$BUILD_NUMBER"
            }
        }

        stage('Run Docker Image') {
            steps {
                sh "docker run --name $CONTAINER_NAME --restart always --env DATABASE_URL=$DATABASE_URL --env SALT_ROUND=$SALT_ROUND --env RIOT_API_KEY=$RIOT_API_KEY -p 3000:3000 -d $REGISTRY:latest"
            }
        }
    }
}
