pipeline {
    agent any

    environment {
        IMAGE = "singhnikhil212/cineverse"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/nikhil-1-2-3/cineverse-devops.git'
            }
        }

        stage('Build Image') {
            steps {
                bat "docker build -t %IMAGE%:%TAG% ."
            }
        }

        stage('Push Image') {
            steps {
                bat "docker push %IMAGE%:%TAG%"
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                bat "kubectl set image deployment/cineverse cineverse=%IMAGE%:%TAG%"
            }
        }
    }
}
