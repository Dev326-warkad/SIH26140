/**
 * Multi-Framework Quantum Code Generator & Translator
 * Translates visual circuit JSON to/from Qiskit, OpenQASM 3.0, Cirq, PennyLane, PyQuil
 */

export function generateQiskitCode(numQubits, gatesList) {
  let code = `from qiskit import QuantumCircuit, Aer, execute\n\n`;
  code += `# Initialize Quantum Circuit with ${numQubits} qubits and ${numQubits} classical bits\n`;
  code += `qc = QuantumCircuit(${numQubits}, ${numQubits})\n\n`;

  gatesList.sort((a, b) => a.step - b.step).forEach(g => {
    const t = g.target;
    const c = g.control;
    switch (g.type) {
      case 'H': code += `qc.h(${t})\n`; break;
      case 'X': code += `qc.x(${t})\n`; break;
      case 'Y': code += `qc.y(${t})\n`; break;
      case 'Z': code += `qc.z(${t})\n`; break;
      case 'S': code += `qc.s(${t})\n`; break;
      case 'T': code += `qc.t(${t})\n`; break;
      case 'RX': code += `qc.rx(${g.angle || 'np.pi/2'}, ${t})\n`; break;
      case 'RY': code += `qc.ry(${g.angle || 'np.pi/2'}, ${t})\n`; break;
      case 'RZ': code += `qc.rz(${g.angle || 'np.pi/2'}, ${t})\n`; break;
      case 'CX': case 'CNOT': code += `qc.cx(${c}, ${t})\n`; break;
      case 'CZ': code += `qc.cz(${c}, ${t})\n`; break;
      case 'SWAP': code += `qc.swap(${c}, ${t})\n`; break;
      case 'CCX': case 'TOFFOLI': code += `qc.ccx(${c}, ${g.control2}, ${t})\n`; break;
      case 'M': code += `qc.measure(${t}, ${t})\n`; break;
      default: break;
    }
  });

  code += `\n# Execute simulation on Qiskit Aer Simulator\n`;
  code += `simulator = Aer.get_backend('statevector_simulator')\n`;
  code += `job = execute(qc, simulator)\n`;
  code += `result = job.result()\n`;
  code += `statevector = result.get_statevector()\n`;
  code += `print("Statevector:", statevector)\n`;

  return code;
}

export function generateOpenQASMCode(numQubits, gatesList) {
  let code = `OPENQASM 3.0;\ninclude "stdgates.inc";\n\n`;
  code += `qubit[${numQubits}] q;\nbit[${numQubits}] c;\n\n`;

  gatesList.sort((a, b) => a.step - b.step).forEach(g => {
    const t = g.target;
    const c = g.control;
    switch (g.type) {
      case 'H': code += `h q[${t}];\n`; break;
      case 'X': code += `x q[${t}];\n`; break;
      case 'Y': code += `y q[${t}];\n`; break;
      case 'Z': code += `z q[${t}];\n`; break;
      case 'S': code += `s q[${t}];\n`; break;
      case 'T': code += `t q[${t}];\n`; break;
      case 'CX': case 'CNOT': code += `cx q[${c}], q[${t}];\n`; break;
      case 'CZ': code += `cz q[${c}], q[${t}];\n`; break;
      case 'SWAP': code += `swap q[${c}], q[${t}];\n`; break;
      case 'M': code += `c[${t}] = measure q[${t}];\n`; break;
      default: break;
    }
  });

  return code;
}

export function generateCirqCode(numQubits, gatesList) {
  let code = `import cirq\n\n`;
  code += `# Create qubits\n`;
  code += `qubits = [cirq.LineQubit(i) for i in range(${numQubits})]\n`;
  code += `circuit = cirq.Circuit()\n\n`;

  gatesList.sort((a, b) => a.step - b.step).forEach(g => {
    const t = g.target;
    const c = g.control;
    switch (g.type) {
      case 'H': code += `circuit.append(cirq.H(qubits[${t}]))\n`; break;
      case 'X': code += `circuit.append(cirq.X(qubits[${t}]))\n`; break;
      case 'Y': code += `circuit.append(cirq.Y(qubits[${t}]))\n`; break;
      case 'Z': code += `circuit.append(cirq.Z(qubits[${t}]))\n`; break;
      case 'CX': case 'CNOT': code += `circuit.append(cirq.CNOT(qubits[${c}], qubits[${t}]))\n`; break;
      case 'CZ': code += `circuit.append(cirq.CZ(qubits[${c}], qubits[${t}]))\n`; break;
      case 'M': code += `circuit.append(cirq.measure(qubits[${t}], key='q${t}'))\n`; break;
      default: break;
    }
  });

  code += `\n# Simulate using Cirq Simulator\n`;
  code += `simulator = cirq.Simulator()\n`;
  code += `result = simulator.simulate(circuit)\n`;
  code += `print(result)\n`;

  return code;
}

export function generatePennyLaneCode(numQubits, gatesList) {
  let code = `import pennylane as qml\nfrom pennylane import numpy as np\n\n`;
  code += `dev = qml.device('default.qubit', wires=${numQubits})\n\n`;
  code += `@qml.qnode(dev)\n`;
  code += `def circuit():\n`;

  if (gatesList.length === 0) {
    code += `    return qml.state()\n`;
    return code;
  }

  gatesList.sort((a, b) => a.step - b.step).forEach(g => {
    const t = g.target;
    const c = g.control;
    switch (g.type) {
      case 'H': code += `    qml.Hadamard(wires=${t})\n`; break;
      case 'X': code += `    qml.PauliX(wires=${t})\n`; break;
      case 'Y': code += `    qml.PauliY(wires=${t})\n`; break;
      case 'Z': code += `    qml.PauliZ(wires=${t})\n`; break;
      case 'CX': case 'CNOT': code += `    qml.CNOT(wires=[${c}, ${t}])\n`; break;
      case 'CZ': code += `    qml.CZ(wires=[${c}, ${t}])\n`; break;
      default: break;
    }
  });

  code += `    return qml.state()\n\nprint("State:", circuit())\n`;
  return code;
}

/**
 * Basic Qiskit/OpenQASM Code Parser (Bi-directional text -> gates array)
 */
export function parseQiskitOrQASM(codeString, numQubits = 4) {
  const gates = [];
  const lines = codeString.split('\n');
  let stepCounter = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

    // Match qiskit h(0) or qasm h q[0];
    let match = trimmed.match(/(?:qc\.)?(h|x|y|z|s|t|cx|cz|measure)\s*(?:\(?\s*q?\[?(\d+)\]?\s*(?:,\s*q?\[?(\d+)\]?)?\)?)/i);
    if (match) {
      const type = match[1].toUpperCase();
      const arg1 = parseInt(match[2], 10);
      const arg2 = match[3] !== undefined ? parseInt(match[3], 10) : undefined;

      if (type === 'CX' || type === 'CZ') {
        gates.push({ id: `gate_${Date.now()}_${Math.random()}`, type, control: arg1, target: arg2, step: stepCounter++ });
      } else {
        gates.push({ id: `gate_${Date.now()}_${Math.random()}`, type: type === 'MEASURE' ? 'M' : type, target: arg1, step: stepCounter++ });
      }
    }
  });

  return gates;
}
