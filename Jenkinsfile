pipeline {
  agent any

  environment {
    // Ganti default sesuai akunmu
    DOCKERHUB_REPO = credentials('dockerhub-creds') // bind user/pass
    IMAGE_NAME     = "expo-mobile"                  // nama image
    DOCKERHUB_USER = ""                             // diisi otomatis di withCredentials
    DOCKERHUB_PASS = ""                             // diisi otomatis di withCredentials
  }

  options { timestamps() }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build Image (dev)') {
      steps {
        script {
          def tag = "${env.BUILD_NUMBER}"
          sh """
            docker build -t ${env.JOB_NAME}:${tag} -t ${env.JOB_NAME}:latest --target dev .
          """
        }
      }
    }

    stage('Login Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
          sh 'echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin'
        }
      }
    }

    stage('Tag & Push') {
      steps {
        script {
          def user = sh(script: 'echo $DOCKERHUB_USER', returnStdout: true).trim()
          def repo = "${user}/${env.JOB_NAME.toLowerCase()}"  // contoh: user/jobname
          def tag  = "${env.BUILD_NUMBER}"

          sh """
            docker tag ${env.JOB_NAME}:latest ${repo}:${tag}
            docker tag ${env.JOB_NAME}:latest ${repo}:latest
            docker push ${repo}:${tag}
            docker push ${repo}:latest
          """
        }
      }
    }

    // (Opsional) Build varian web juga
    stage('Build & Push Web Variant') {
      when { expression { return true } } // set false kalau tidak perlu
      steps {
        script {
          def user = sh(script: 'echo $DOCKERHUB_USER', returnStdout: true).trim()
          def repo = "${user}/${env.JOB_NAME.toLowerCase()}-web"
          def tag  = "${env.BUILD_NUMBER}"

          sh """
            docker build -t ${repo}:${tag} -t ${repo}:latest --target web .
            docker push ${repo}:${tag}
            docker push ${repo}:latest
          """
        }
      }
    }
  }

  post {
    always {
      sh 'docker logout || true'
    }
  }
}
