import * as THREE from 'three';

export function buildBabylonEventModelNode(sceneData) {
    const root = new THREE.Group();
    const meshes = Array.isArray(sceneData?.meshes) ? sceneData.meshes : [];
    const sharedMaterial = new THREE.MeshStandardMaterial({
        color: 0xdfe7f1,
        emissive: 0x223344,
        emissiveIntensity: 0.18,
        roughness: 0.68,
        metalness: 0.22,
        side: THREE.DoubleSide
    });

    for (const meshData of meshes) {
        const positions = Array.isArray(meshData?.positions) ? meshData.positions : [];
        const indices = Array.isArray(meshData?.indices) ? meshData.indices : [];
        if (positions.length < 9 || indices.length < 3) continue;

        const geometry = new THREE.BufferGeometry();
        const transformedPositions = new Float32Array(positions.length);
        for (let i = 0; i < positions.length; i += 3) {
            transformedPositions[i] = positions[i];
            transformedPositions[i + 1] = positions[i + 2];
            transformedPositions[i + 2] = -positions[i + 1];
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(transformedPositions, 3));
        geometry.setIndex(indices);

        const normals = Array.isArray(meshData?.normals) ? meshData.normals : [];
        if (normals.length === positions.length) {
            const transformedNormals = new Float32Array(normals.length);
            for (let i = 0; i < normals.length; i += 3) {
                transformedNormals[i] = normals[i];
                transformedNormals[i + 1] = normals[i + 2];
                transformedNormals[i + 2] = -normals[i + 1];
            }
            geometry.setAttribute('normal', new THREE.BufferAttribute(transformedNormals, 3));
        } else {
            geometry.computeVertexNormals();
        }

        const uvs = Array.isArray(meshData?.uvs) ? meshData.uvs : [];
        if (uvs.length >= (positions.length / 3) * 2) {
            geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
        }

        const mesh = new THREE.Mesh(geometry, sharedMaterial);
        const position = Array.isArray(meshData?.position) ? meshData.position : [0, 0, 0];
        mesh.position.set(position[0] || 0, position[2] || 0, -(position[1] || 0));
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        root.add(mesh);
    }

    const bounds = new THREE.Box3().setFromObject(root);
    const center = bounds.getCenter(new THREE.Vector3());
    root.position.sub(center);
    return root;
}
