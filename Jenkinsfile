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
          sh "npm install"
          sh "npm build"
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
