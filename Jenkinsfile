pipeline {
    agent {
        docker {
            image 'node:9-alpine'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deliver') {
            steps {
                input message: 'Click "Proceed" to continue'
            }
        }
    }
}
