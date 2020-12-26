pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '~/scripts/campus-backend.sh'
            }
        }
        stage('Restarting Pm2 server') {
            steps {
                sh 'pm2 restart all'
            }
        }
    }
}
