import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)

  //카메라

  const camera = new THREE.PerspectiveCamera(
    100, //fov
    window.innerWidth / window.innerHeight, //aspect
    0.1, //near
    1000 //far
  )
  // camera.position.set(0, 0, 1)
  camera.position.x = -1
  camera.position.y = 1
  camera.position.z = 1
  //z는 앞 뒤 깊이를 줌 / 나를 기점으로 앞으로 플러스+ 나보다 뒤에 있으면 마이너스-
  camera.lookAt(new THREE.Vector3(0, 0, 0))

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

  // 도형 추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

  const material = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = 1
  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  function render(time) {
    time *= 0.0005 // convert time to seconds

    // obj01.rotation.x = time

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
