pipeline {
  agent any
  environment {
    registry = "airren/echo-bio-react"
    registryCredential="dockerhub"
  }
  stages {

      stage('node build') {
        steps{
          sh "pwd"
          sh "ls"
          sh "PATH=/usr/local/node18/bin:$PATH yarn "
          sh "PATH=/usr/local/node18/bin:$PATH NODE_OPTIONS=--openssl-legacy-provider yarn build"
        }
      }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build(registry)
        }
      }
    }
    stage('Docker Push') {
      steps {
        script{
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push("v0.0.$BUILD_NUMBER")
            dockerImage.push("latest")
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry"
        sh "docker rmi $registry:v0.0.$BUILD_NUMBER"
      }
    }
  }
}
