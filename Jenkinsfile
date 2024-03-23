pipeline {
    agent any

    environment {
        registryCredential = 'docker-hub-credentials'
        registry = 'tekmatteo/ksos-back'
        containerName = 'KsosBack'
        hash = credentials('hash')
        databaseUrl = credentials('database-url')
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
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }

        stage('Run Docker Image') {
            steps {
                sh "docker run --name $containerName --restart always --env DATABASE_URL=${databaseUrl} --env HASH=${hash} -p 3000:3000 -d ${registry}:latest"
            }
        }
    }
}
