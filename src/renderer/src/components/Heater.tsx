import React from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

type AnimateProps = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.Renderer
}

type TriggerFunction = () => void

interface Animate {
  animate: () => void
  addTrigger: (cb: TriggerFunction) => void
  offTrigger: (cb: TriggerFunction) => void
}

class Heater extends React.Component {
  private mount: HTMLDivElement | null = null
  private loader: STLLoader
  private textureLoader: THREE.TextureLoader
  private gui: dat.GUI

  constructor(props: object) {
    super(props)
    this.loader = new STLLoader()
    this.textureLoader = new THREE.TextureLoader()
    this.gui = new dat.GUI()
  }

  createAnimate({ scene, camera, renderer }: AnimateProps): Animate {
    const triggers: TriggerFunction[] = []

    const animate = (): void => {
      requestAnimationFrame(animate)

      triggers.forEach((trigger) => {
        trigger()
      })

      renderer.render(scene, camera)
    }

    const addTrigger = (cb: TriggerFunction): void => {
      if (typeof cb === 'function') triggers.push(cb)
    }

    const offTrigger = (cb: TriggerFunction): void => {
      const triggerIndex = triggers.indexOf(cb)
      if (triggerIndex !== -1) {
        triggers.splice(triggerIndex, 1)
      }
    }

    return { animate, addTrigger, offTrigger }
  }

  async componentDidMount(): Promise<void> {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      750,
      window.innerWidth / window.innerHeight,
      10,
      100000
    )

    this.loader.load(
      'https://cdn.jsdelivr.net/gh/hj5230/assets/heater.STL',
      (geometry: THREE.BufferGeometry) => {
        const material = new THREE.MeshMatcapMaterial({
          color: 0xffffff,
          matcap: this.textureLoader.load(
            'https://cdn.jsdelivr.net/gh/hj5230/assets/matcap-porcelain-white.jpg'
          )
        })
        const mesh = new THREE.Mesh(geometry, material)

        mesh.geometry.computeVertexNormals(true)
        mesh.geometry.center()

        scene.add(mesh)

        mesh.rotation.x = -1.2
      }
    )

    const renderer = new THREE.WebGLRenderer()
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.maxDistance = 3000
    controls.minDistance = 2000

    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const secondaryLight = new THREE.PointLight(0xff0000, 1, 100)
    secondaryLight.position.set(5, 5, 5)
    scene.add(secondaryLight)

    this.gui.add(secondaryLight.position, 'y').min(-10).max(10).step(0.1)

    renderer.setSize(window.innerWidth, window.innerHeight)
    this.mount?.appendChild(renderer.domElement)

    const onWindowResize = (): void => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize, false)

    const animate = this.createAnimate({ scene, camera, renderer })

    camera.position.z = 500

    animate.animate()
  }

  render(): React.ReactNode {
    return <div ref={(ref) => (this.mount = ref)} />
  }
}

export default Heater
