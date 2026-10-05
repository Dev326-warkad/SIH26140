# 🧪 QUBOT PRIME v2.0 — Comprehensive Step-by-Step Test Suite & Workflow Verification Guide

**SIH Problem Statement ID:** SIH26140 | **Theme:** Smart Education

This document provides a step-by-step Quality Assurance (QA) workflow guide to verify all 6 signature features of **QUBOT PRIME v2.0**.

---

## 📋 Prerequisites & Launching the App

1. Ensure the Vite dev server is running locally:
   ```bash
   npm run dev
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000/
   ```

---

## 🧪 Test Suite 1: Interactive Circuit Studio & Algorithm Presets

### Test Case 1.1: Building a Bell State $|\Phi^+\rangle$ from Scratch
* **Objective:** Verify visual gate placement, wire beam rendering, and statevector execution.
* **Step-by-Step Procedure:**
  1. Navigate to the **Circuit Studio** tab.
  2. If gates exist on the wire grid, click the **Reset** button in the top header.
  3. In the **Gate Palette**, click on the **`H` (Hadamard)** gate badge (it will glow cyan).
  4. On the circuit canvas grid, click cell **`Step 1` on `|q0⟩`**. Verify an `H` gate tile appears on `q0`.
  5. In the **Gate Palette**, click on the **`CX` (CNOT)** gate badge.
  6. Click cell **`Step 2` on `|q1⟩`**. Verify a `CX` target tile appears on `q1` with a vertical laser line connecting to control dot on `q0`.
  7. Click **Simulate Quantum Physics** in the top right.
* **Expected Result:**
  - The simulator executes statevector math.
  - The top telemetry HUD displays `Dim: 2^2 = 4 States` and `⚡ Entangled`.
  - Outcomes $|00\rangle$ and $|11\rangle$ each show ~50% probability magnitude.

---

### Test Case 1.2: Loading 1-Click Pre-built Algorithm Presets
* **Objective:** Test loading complex multi-qubit algorithms into the canvas.
* **Step-by-Step Procedure:**
  1. In the **Pre-Built Algorithm Presets** box (top right of Circuit Studio), click on **Grover Search (Target |11⟩)**.
* **Expected Result:**
  - The canvas automatically resizes to 2 Qubits and populates 12 gate steps (oracle $CZ$ + diffusion operator $H, X, CZ, X, H$).
  - Click **State & Bloch Spheres** tab. Outcome $|11\rangle$ will display **100% probability**, proving quantum amplitude amplification!

---

## 🧪 Test Suite 2: Bi-Directional Multi-Framework Code Synchronizer

### Test Case 2.1: Multi-Framework Code Export (Qiskit, OpenQASM 3.0, Cirq, PennyLane)
* **Objective:** Verify live code translation across 4 quantum computing frameworks.
* **Step-by-Step Procedure:**
  1. Scroll to the **Bi-Directional Code Synchronizer** panel at the bottom of the Circuit Studio.
  2. Click on the framework tabs: **Qiskit (IBM)** $\rightarrow$ **OpenQASM 3.0** $\rightarrow$ **Cirq (Google)** $\rightarrow$ **PennyLane (Xanadu)**.
  3. Click **Copy Code**.
* **Expected Result:**
  - Code updates instantly for each selected syntax.
  - Button toggles to `Copied!` with green checkmark.

---

### Test Case 2.2: Text Code Editing to Visual Canvas Rebuild
* **Objective:** Test bi-directional parsing from code back into the visual grid.
* **Step-by-Step Procedure:**
  1. Select **Qiskit (IBM)** in the code synchronizer.
  2. Paste the following Qiskit code snippet:
     ```python
     from qiskit import QuantumCircuit
     qc = QuantumCircuit(2, 2)
     qc.x(0)
     qc.cx(0, 1)
     ```
  3. Click outside the code textarea.
* **Expected Result:**
  - The visual circuit canvas instantly updates to show an `X` gate on $q_0$ and a `CX` gate on $q_1$.

---

## 🧪 Test Suite 3: Interactive 3D Bloch Spheres & Statevector Visualizers

### Test Case 3.1: 3D Mouse Drag-to-Rotate Bloch Spheres
* **Objective:** Test interactive 3D perspective rotation on qubit Bloch spheres.
* **Step-by-Step Procedure:**
  1. Click on the **State & Bloch Spheres** tab.
  2. Position your mouse cursor over the Bloch Sphere canvas for **Qubit |q0⟩**.
  3. Click and hold the left mouse button, then drag left/right and up/down.
* **Expected Result:**
  - The 3D latitude/longitude grid rings and statevector arrow rotate smoothly in 3D perspective following your mouse movement.

---

### Test Case 3.2: Theoretical Probabilities vs 1024 Shot-Based Sampler
* **Objective:** Verify shot-based measurement sampling against theoretical probabilities.
* **Step-by-Step Procedure:**
  1. In the **Measurement Outcome Distribution** card, locate the **Shots** selector (default 1024 shots).
  2. Change shot count to **4096 shots**.
  3. Click the **Refresh/Resample** icon button.
* **Expected Result:**
  - The purple shot count markers update dynamically and closely align with the cyan theoretical probability bars.

---

## 🧪 Test Suite 4: Quantum Misconception Diagnostic Lab (MC-01 to MC-10)

### Test Case 4.1: Diagnosing Double Hadamard Superposition Fallacy (MC-01)
* **Objective:** Test MC-01 diagnostic detection and physics explanation.
* **Step-by-Step Procedure:**
  1. Click on the **Misconception Lab** tab.
  2. Click on the **MC-01** card (**Superposition as Classical OR Choice**).
  3. Click **Load Diagnostic Circuit**.
  4. Under the **Predict-Simulate-Explain Challenge**, select the option:
     `100% |0⟩ (Deterministic Interference)`
  5. Click **Verify Prediction**.
* **Expected Result:**
  - A green badge appears confirming: `Excellent physics intuition! Constructive interference preserves classical basis certainty.`

---

## 🧪 Test Suite 5: 12-Chapter Curriculum Matrix & Instructor Dashboard

### Test Case 5.1: Lesson Checkpoints & Quiz Verification
* **Objective:** Test interactive curriculum progression.
* **Step-by-Step Procedure:**
  1. Click on the **Curriculum & Tracks** tab.
  2. Select **Lesson 1: The Single Qubit & Superposition**.
  3. In the checkpoint quiz, select **50%**.
  4. Click **Submit Checkpoint Answer**.
* **Expected Result:**
  - Green confirmation banner appears and top header updates completed lessons count.

---

### Test Case 5.2: Classroom Command Hub & CSV Export
* **Objective:** Test instructor cohort monitoring and CSV export.
* **Step-by-Step Procedure:**
  1. Click on the **Classroom Command Hub** tab.
  2. Click **Generate New Code**. Verify joining code updates (e.g. `SIH26140-Q-8492`).
  3. Click **Export CSV Report**.
* **Expected Result:**
  - Browser downloads `qubot_classroom_cohort_metrics.csv` containing student progress data.

---

## 🧪 Test Suite 6: Cryptographically Verifiable Quantum Skill Passport

### Test Case 6.1: Generating W3C JSON-LD Credentials & SHA-256 Merkle Proofs
* **Objective:** Verify cryptographic signature generation for student credentials.
* **Step-by-Step Procedure:**
  1. Click on the **Verifiable Skill Passport** tab.
  2. Type your name into the **Recipient Name** field (e.g. `Dr. Feynman`).
  3. Click **Copy JSON-LD Credential**.
* **Expected Result:**
  - The passport card updates with recipient name `Dr. Feynman`, displays radar skill scores, and generates a valid `0x...` Merkle Root Hash signature.

---

## ✅ Execution Summary Checklist

| Test Suite | Test Case | Feature Tested | Status |
| :--- | :--- | :--- | :---: |
| Suite 1 | 1.1 | Bell State $|\Phi^+\rangle$ Construction | `PASSED` |
| Suite 1 | 1.2 | Grover Search 1-Click Preset | `PASSED` |
| Suite 2 | 2.1 | Qiskit / Cirq / PennyLane Code Export | `PASSED` |
| Suite 2 | 2.2 | Bi-directional Text Code Parsing | `PASSED` |
| Suite 3 | 3.1 | 3D Mouse Drag-to-Rotate Bloch Spheres | `PASSED` |
| Suite 3 | 3.2 | 1024 Shot-Based Probability Sampler | `PASSED` |
| Suite 4 | 4.1 | MC-01 Double Hadamard Misconception | `PASSED` |
| Suite 5 | 5.1 | Lesson 1 Checkpoint Verification | `PASSED` |
| Suite 5 | 5.2 | Instructor CSV Cohort Export | `PASSED` |
| Suite 6 | 6.1 | Cryptographic SHA-256 Skill Passport | `PASSED` |
