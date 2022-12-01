import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const FogColor = 0x004fff
  const objColor = 0xffffff
  const FloorColor = 0x555555

  //장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color()

  //카메라
  const camera = new THREE.PerspectiveCamera(
    120, //fov
    window.innerWidth / window.innerHeight, //aspect
    0.1, //near
    1000 //far
  )
  // camera.position.set(0, 0, 1)
  camera.position.x = 0
  camera.position.y = 1.5
  camera.position.z = 3
  //z는 앞 뒤 깊이를 줌 / 나를 기점으로 앞으로 플러스+ 나보다 뒤에 있으면 마이너스-
  // camera.lookAt(new THREE.Vector3(0, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  // ambientLight.castShadow = true // 그림자 안 먹힘

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(5, 1, 2)
  // directionalLight.castShadow = true
  // directionalLight.shadow.mapSize.width = 1024 // 수치가 높을 수록 그림자 선명해짐
  // directionalLight.shadow.mapSize.height = 1024 // 수치가 높을 수록 그림자 선명해짐
  // directionalLight.shadow.radius = 8

  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  // scene.add(dlHelper)
  scene.add(directionalLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(-1, 1, 0.5)
  const plhelper = new THREE.PointLightHelper(pointLight, 0.1)
  // scene.add(pointLight)
  // scene.add(plhelper)
  // pointLight.castShadow = true

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectLight)
  // rectLight.position.set(0.5, 0.5, 1)
  // rectLight.lookAt(0, 0, 0)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  // spotLight.position.set(1, 2, 1)
  // scene.add(spotLight)
  // spotLight.castShadow = true

  // 도형 추가
  const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80)

  const material = new THREE.MeshStandardMaterial({})
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = 0.4
  cube.position.y = 0.5
  scene.add(cube)
  cube.castShadow = true

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)
  plane.receiveShadow = true

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
