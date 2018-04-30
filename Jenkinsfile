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
    }
}
