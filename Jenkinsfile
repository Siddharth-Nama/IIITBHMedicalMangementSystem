pipeline {
    agent {
        node {
            label 'built-in'
        }
    }
    environment {
        NVM_DIR = "$HOME/.nvm"
    }
    stages {
        stage('Fetch SCM: GITHUB') {
            steps {
                echo 'Getting Everything from SCM'
            }
        }
        stage('Build') {
            steps {
                echo 'Building....'
                sh '''
                    cp -rvf $WORKSPACE/* /arogya/
                '''
            }
        }
    }
}
