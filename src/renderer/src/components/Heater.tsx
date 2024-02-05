import React from 'react'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type AnimateProps = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.Renderer
}

type TriggerFunction = () => void

interface Props {
  windowWidth: number
  widgetHeight: number
}

interface Animate {
  animate: () => void
  addTrigger: (cb: TriggerFunction) => void
  offTrigger: (cb: TriggerFunction) => void
}

class Heater extends React.Component<Props, object> {
  private mount: HTMLDivElement | null = null
  private loader: STLLoader
  private textureLoader: THREE.TextureLoader
  private scene: THREE.Scene | null = null
  private camera: THREE.PerspectiveCamera | null = null
  private renderer: THREE.Renderer | null = null
  private animationId: number | null = null

  constructor(props: Props) {
    super(props)
    this.loader = new STLLoader()
    this.textureLoader = new THREE.TextureLoader()
    this.onWindowResize = this.onWindowResize.bind(this)
  }

  componentDidMount = async (): Promise<void> => {
    const { windowWidth, widgetHeight } = this.props
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(750, windowWidth / widgetHeight, 10, 100000)

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
        this.scene.add(mesh)
        mesh.rotation.x = -1.2
      }
    )

    this.renderer = new THREE.WebGLRenderer()
    const controls = new OrbitControls(this.camera, this.renderer.domElement)

    controls.maxDistance = 3000
    controls.minDistance = 2000

    const geometry = new THREE.BoxGeometry(10, 10, 10)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    const secondaryLight = new THREE.PointLight(0xff0000, 1, 100)
    secondaryLight.position.set(5, 5, 5)
    this.scene.add(secondaryLight)

    this.renderer.setSize(windowWidth, widgetHeight)
    this.mount?.appendChild(this.renderer.domElement)

    window.addEventListener('resize', this.onWindowResize, false)

    const animate = this.createAnimate({
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer
    })

    this.camera.position.z = 500

    animate.animate()
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onWindowResize)
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) {
            object.geometry.dispose()
          }

          if (object.material) {
            const material = object.material
            if (Array.isArray(material)) {
              material.forEach((mat) => this.disposeMaterial(mat))
            } else {
              this.disposeMaterial(material)
            }
          }
        }
      })
    }
    if (this.renderer) {
      this.mount?.removeChild(this.renderer.domElement)
      this.renderer.dispose()
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
  }

  onWindowResize = (): void => {
    const { windowWidth, widgetHeight } = this.props
    if (this.camera && this.renderer) {
      this.camera.aspect = windowWidth / widgetHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(windowWidth, widgetHeight)
    }
  }

  createAnimate = ({ scene, camera, renderer }: AnimateProps): Animate => {
    const triggers: TriggerFunction[] = []
    const animate = (): void => {
      this.animationId = requestAnimationFrame(animate)
      triggers.forEach((trigger) => trigger())
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

  disposeMaterial = (material: THREE.Material): void => {
    if (material.map) material.map.dispose()
    if (material.lightMap) material.lightMap.dispose()
    if (material.bumpMap) material.bumpMap.dispose()
    if (material.normalMap) material.normalMap.dispose()
    if (material.specularMap) material.specularMap.dispose()
    if (material.envMap) material.envMap.dispose()
    material.dispose()
  }

  render(): React.ReactNode {
    return <div ref={(ref) => (this.mount = ref)} />
  }
}

export default Heater
