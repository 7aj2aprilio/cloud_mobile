pipeline {
  agent any

  environment {
    IMAGE_DEV = "pioaprilio/cloud_mobile"
    IMAGE_WEB = "pioaprilio/cloud_mobile-web"
  }

  stages {
    stage('Checkout') {
      steps {
        // Ambil kode dari GitHub repo
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/7aj2aprilio/cloud_mobile.git'
          ]]
        ])
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                          usernameVariable: 'DOCKERHUB_USER',
                                          passwordVariable: 'DOCKERHUB_PASS')]) {
          bat '''
          echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% --password-stdin
          '''
        }
      }
    }

    stage('Build Dev Image') {
      steps {
        bat '''
        docker build -t pioaprilio/cloud_mobile:%BUILD_NUMBER% -t pioaprilio/cloud_mobile:latest --target dev .
        '''
      }
    }

    stage('Push Dev Image') {
      steps {
        bat '''
        docker push pioaprilio/cloud_mobile:%BUILD_NUMBER%
        docker push pioaprilio/cloud_mobile:latest
        '''
      }
    }

    stage('Build & Push Web Image') {
      steps {
        bat '''
        docker build -t pioaprilio/cloud_mobile-web:%BUILD_NUMBER% -t pioaprilio/cloud_mobile-web:latest --target web .
        docker push pioaprilio/cloud_mobile-web:%BUILD_NUMBER%
        docker push pioaprilio/cloud_mobile-web:latest
        '''
      }
    }
  }

  post {
    always {
      bat 'docker logout || ver >NUL'
    }
  }
}
