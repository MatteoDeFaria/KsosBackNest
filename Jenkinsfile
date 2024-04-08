pipeline {
    agent any

    environment {
        registryCredential = 'docker-hub-credentials'
        REGISTRY = 'tekmatteo/ksos-back'
        CONTAINER_NAME = 'KsosBack'
        HASH = credentials('hash')
        DATABASE_URL = credentials('database-url')
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
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
                sh "docker rmi $REGISTRY:latest"
            }
        }

        stage('Stop and clean up old latest Docker Image') {
            agent { node { label 'pi5' } }

            steps {
                script {
                    oldContainerId = sh(script: "docker ps -q -f name=$CONTAINER_NAME", returnStdout: true)
                    oldImageId = sh(script: "docker images -qf reference=$REGISTRY:latest", returnStdout: true)

                    if (oldContainerId != '') {
                        sh "docker stop $CONTAINER_NAME"
                        sh "docker rm $CONTAINER_NAME"
                    } else {
                        echo "No container to delete..."
                    }

                    if (oldImageId != '') {
                        sh "docker rmi $REGISTRY:latest"
                    } else {
                        echo "No image to delete..."
                    }
                }
            }
        }

        stage('Run Docker Image') {
            agent { node { label 'pi5' } }

            steps {
                sh "docker run --name $CONTAINER_NAME --restart always --env DATABASE_URL=$DATABASE_URL --env HASH=$HASH -p 3000:3000 -d $REGISTRY:latest"
            }
        }
    }
}
