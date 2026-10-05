<div align="center">

# ⚛️ QUBOT PRIME v2.0
### Enterprise-Grade AI-Based Interactive Quantum Algorithm Learning Platform
**Smart India Hackathon (SIH 2026) | Problem Statement ID: SIH26140**

[![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Qiskit Aer](https://img.shields.io/badge/Qiskit_Aer-2.5-6929C4?style=for-the-badge&logo=ibm&logoColor=white)](https://qiskit.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

**QUBOT PRIME** is a closed-loop, high-performance educational ecosystem engineered for quantum computing. It synthesizes genuine quantum statevector physics simulations, an interactive 3D drag-to-rotate Bloch sphere renderer, a Socratic AI companion mascot (**Qubey 3D**), an automated Quantum Misconception Diagnostic Engine (**MC-01 to MC-10**), multi-framework code translation (Qiskit, OpenQASM 3.0, Cirq, PennyLane), and W3C JSON-LD cryptographically verifiable skill passports.

[Features](#-key-features--signature-innovations) • [Architecture](#-system-architecture) • [Curriculum](#-12-chapter-curriculum-matrix) • [Quickstart](#-quickstart-guide) • [Framework Alignment](#-cross-framework-endianness-matrix)

</div>

---

## 🎯 Problem Statement (SIH26140)

Quantum computing is transformative but difficult to teach because qubits, superposition, entanglement, and quantum interference are highly abstract concepts. Existing learning materials are often static or heavily theoretical, while hardware access remains limited.

**QUBOT PRIME** resolves these challenges by delivering an interactive, zero-cloud dependency, web-based laboratory platform where students can visually build quantum circuits, run real-time statevector math simulations, diagnose physical misconceptions, and export production-ready code.

---

## ✨ Key Features & Signature Innovations

### 1. ⚡ Holographic Quantum Circuit Studio & Pulsing Laser Grid
- **Multi-Qubit Grid Canvas**: Drag-and-drop & click gate placement supporting up to 8 qubits.
- **Categorized Gate Palette**:
  - *Single Qubit*: Hadamard ($H$), Pauli ($X, Y, Z$), Phase ($S, T, S^\dagger, T^\dagger$).
  - *Parametric Rotations*: $R_x(\theta), R_y(\theta), R_z(\theta), P(\theta)$ with interactive angle sliders.
  - *Multi-Qubit & Controls*: $CX$ (CNOT), $CZ$, $SWAP$, $CCX$ (Toffoli).
  - *Readout*: Measurement ($M$) & Reset.
- **1-Click Algorithm Presets**: Instant load for Bell State $|\Phi^+\rangle$, 3-Qubit GHZ State, Deutsch-Jozsa, Grover 2-Qubit Search, and Quantum Fourier Transform (QFT).

### 2. 🌐 Interactive 3D Drag-to-Rotate Bloch Spheres
- Real-time 3D projected Bloch Sphere renderer for every qubit with mouse-drag rotation controls.
- Displays latitude/longitude grid rings, exact state vector coordinates $(x, y, z)$, polar angle $\theta$, azimuthal phase angle $\phi$, and basis probabilities $P(|0\rangle)$ and $P(|1\rangle)$.

### 3. 🚨 Quantum Misconception Diagnostic Engine (MC-01 to MC-10)
Diagnoses 10 fundamental student fallacies in real-time based on circuit structure and prediction discrepancies:
- **MC-01**: Superposition as Classical OR Choice
- **MC-02**: Measurement Without State Collapse
- **MC-03**: Faster-Than-Light Entanglement Signaling
- **MC-04**: Global Phase vs Relative Phase Fallacy
- **MC-05**: Qubit Endianness Indexing Confusion
- **MC-06**: Destructive Interference Cancellation Ignored
- **MC-07**: No-Cloning Theorem Violation
- **MC-08**: Non-Unitary State Mutation
- **MC-09**: Unmeasured Qubit Readout Expectation
- **MC-10**: Teleportation as Matter Disintegration

### 4. 🔄 Bi-Directional Multi-Framework Code Synchronizer
- Instantly translates visual circuit grids to **IBM Qiskit**, **OpenQASM 3.0**, **Google Cirq**, and **Xanadu PennyLane**.
- Bi-directional code parser lets users edit Python or QASM text to update the visual circuit canvas.

### 5. 🔀 Cross-Framework Endianness Matrix
- Automatically aligns qubit indexing conventions between **Qiskit** (Little-Endian, $q_0$ rightmost bit) and **Cirq / PennyLane** (Big-Endian, $q_0$ leftmost bit), ensuring physics consistency across libraries.

### 6. 🤖 Socratic AI Companion Mascot ("Qubey 3D")
- Reactive 3D particle orb mascot with dynamic expression states (*idle*, *thinking*, *explaining*, *celebrating*, *error*).
- Grounded Socratic assistant that evaluates student questions using exact offline statevector math.

### 7. 🎓 12-Chapter Curriculum Matrix & Instructor Command Hub
- 4 Track-based interactive paths with checkpoints and quizzes.
- Instructor Portal for generating classroom codes, tracking cohort competency metrics, and exporting SCORM/CSV reports.

### 8. 🛡️ Cryptographically Verifiable Quantum Skill Passport
- Generates W3C JSON-LD Verifiable Credentials with SHA-256 Merkle root hashes and verifiable skill radar indicators.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[React 18 + Vite Frontend HUD] --> B[Quantum Circuit Canvas Grid]
    A --> C[Socratic AI Tutor Mascot]
    A --> D[Misconception Diagnostic Engine]
    
    B --> E[Pure JS Quantum Simulator Engine]
    E --> F[Exact Statevector ∑ α_i |i⟩]
    E --> G[3D Bloch Sphere Projections]
    E --> H[Probability & Shot Sampler 1024 Shots]
    
    B --> I[Multi-Framework Code Translator]
    I --> J[IBM Qiskit / OpenQASM 3.0 / Cirq / PennyLane]
    
    D --> K[MC-01 to MC-10 Diagnostic Rules]
    A --> L[Verifiable Skill Passport SHA-256]
```

---

## 🚀 Quickstart Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Local Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dev326-warkad/SIH26140.git
   cd SIH26140
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000/`.

4. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## 📚 12-Chapter Curriculum Matrix

| Track | Chapter / Lesson Title | Checkpoint / Concept Covered |
| :--- | :--- | :--- |
| **Track 1: Foundations** | Lesson 1: Single Qubit & Superposition | Hadamard gate, $|0\rangle$, $|1\rangle$, $(|0\rangle+|1\rangle)/\sqrt{2}$ |
| | Lesson 2: Bloch Sphere & Rotations | Pauli-X, Y, Z, Rx, Ry, Rz, Phase shifts |
| | Lesson 3: Born Rule & Measurement | Non-unitary measurement collapse, 1024 shot sampling |
| **Track 2: Multi-Qubit** | Lesson 4: CNOT & Controlled Gates | Control-target interaction, CX, CZ, SWAP |
| | Lesson 5: Bell States & Entanglement | $|\Phi^+\rangle = (|00\rangle+|11\rangle)/\sqrt{2}$, non-local correlations |
| | Lesson 6: Quantum Teleportation | 3-Qubit state transfer with 2 classical bits |
| **Track 3: Algorithms** | Lesson 7: Deutsch-Jozsa Algorithm | Evaluating global oracle properties in 1 evaluation |
| | Lesson 8: Grover Search Algorithm | Amplitude amplification, unsorted search $O(\sqrt{N})$ |
| **Track 4: Noise & Error**| Lesson 9: Bit-Flip Error Correction | 3-Qubit parity checks, indirect ancilla measurement |

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

Developed for **Smart India Hackathon 2026 (SIH26140)**.
