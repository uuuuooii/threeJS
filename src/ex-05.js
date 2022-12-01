import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
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
  camera.position.y = 1
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

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.5)
  // scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(1, 1, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  // scene.add(dlHelper)
  // scene.add(directionalLight)

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1)
  // scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  // scene.add(pointLight)
  pointLight.position.set(-2, 0.5, 0.5)
  const plhelper = new THREE.PointLightHelper(pointLight, 0.1)
  // scene.add(plhelper)

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1)
  // scene.add(rectLight)
  rectLight.position.set(0.5, 0.5, 1)
  rectLight.lookAt(0, 0, 0)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  scene.add(spotLight)

  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.5, 32, 16)

  const material = new THREE.MeshStandardMaterial({})
  const cube = new THREE.Mesh(geometry, material)
  cube.position.x = 0.5
  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
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
