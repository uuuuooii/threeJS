import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color()

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 3

  // 캔버스
  const canvas = document.querySelector('#ex-03')

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  // 텍스처 추가
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/img/Water_002_COLOR.jpg'
  )
  const textureDISPMap = textureLoader.load('../static/img/Water_002_DISP.jpg')

  const textureNORMMap = textureLoader.load('../static/img/Water_002_NORM.jpg')

  const textureOCCMap = textureLoader.load('../static/img/Water_002_OCC.jpg')

  const textureROUGHMap = textureLoader.load(
    '../static/img/Water_002_ROUGH.jpg'
  )

  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  //   const geometry = new THREE.PlaneGeometry(1, 1)

  const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
  })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -2
  scene.add(obj01)

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNORMMap,
  })
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -1
  scene.add(obj02)

  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNORMMap,
    displacementMap: textureDISPMap,
  })
  const obj03 = new THREE.Mesh(geometry, material03)
  obj03.position.x = 0
  scene.add(obj03)

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNORMMap,
    displacementMap: textureDISPMap,
    roughnessMap: textureROUGHMap,
    roughness: 0.3,
  })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = 1
  scene.add(obj04)

  const material05 = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const obj05 = new THREE.Mesh(geometry, material05)
  obj05.position.x = 2
  scene.add(obj05)

  function render(time) {
    time *= 0.0005 // convert time to seconds

    obj01.rotation.x = time
    obj01.rotation.y = time
    obj02.rotation.y = time
    obj03.rotation.y = time
    obj04.rotation.y = time
    obj05.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
