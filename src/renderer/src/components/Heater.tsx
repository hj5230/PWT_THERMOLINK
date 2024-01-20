import React, { RefObject } from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
// check WebGL
// import WebGL from '@renderer/interfaces/WebGL.js'

class Heater extends React.Component {
  private mount: RefObject<HTMLDivElement>
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer

  constructor(props: object) {
    super(props)
    this.mount = React.createRef()
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
  }

  componentDidMount = async (): Promise<void> => {
    // if (WebGL.isWebGLAvailable()) console.log('ok')
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    if (this.mount.current) {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.mount.current.appendChild(this.renderer.domElement)
    }

    this.scene.background = new THREE.Color(0x8fbcd4)
    const ambientLight = new THREE.AmbientLight(0x404040)
    this.scene.add(ambientLight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 1, 0)
    this.scene.add(directionalLight)

    const loader = new STLLoader()
    fetch(`https://cdn.jsdelivr.net/gh/hj5230/assets/heater.STL`)
      .then((response) => response.blob())
      .then((blob) => {
        // console.log(blob)
        loader.load(URL.createObjectURL(blob), (geometry) => {
          const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
          const mesh = new THREE.Mesh(geometry, material)
          mesh.scale.set(0.1, 0.1, 0.1)
          this.scene.add(mesh)
          this.animate()
          this.camera.position.z = 5
        })
      })
  }

  // componentWillUnmount = (): void => {
  //   if (this.mount.current) {
  //     this.mount.current.removeChild(this.renderer.domElement)
  //   }
  // }

  animate = (): void => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  render(): React.ReactNode {
    return <div ref={this.mount} />
  }
}
export default Heater
