import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import GatePalette from './components/CircuitStudio/GatePalette';
import CircuitCanvas from './components/CircuitStudio/CircuitCanvas';
import CodeEditorSync from './components/CircuitStudio/CodeEditorSync';
import AlgorithmPresets from './components/CircuitStudio/AlgorithmPresets';
import BlochSphereCanvas from './components/Visualizer/BlochSphereCanvas';
import ProbabilityHistogram from './components/Visualizer/ProbabilityHistogram';
import StatevectorTable from './components/Visualizer/StatevectorTable';
import EndianMatrixView from './components/Visualizer/EndianMatrixView';
import SocraticTutorPanel from './components/TutorMascot/SocraticTutorPanel';
import MisconceptionCard from './components/MisconceptionLab/MisconceptionCard';
import CurriculumTracks from './components/LMS/CurriculumTracks';
import InstructorDashboard from './components/LMS/InstructorDashboard';
import SkillPassport from './components/Passport/SkillPassport';
import Footer from './components/Footer';

import { simulateCircuit } from './engine/quantumSimulator';

export default function App() {
  const [activeTab, setActiveTab] = useState('studio');
  const [numQubits, setNumQubits] = useState(2);
  const [selectedGateType, setSelectedGateType] = useState('H');
  const [rotationAngle, setRotationAngle] = useState(1.57);
  const [completedLessons, setCompletedLessons] = useState(['l1', 'l2', 'l4', 'l5']);

  // Initial Bell State circuit
  const [gatesList, setGatesList] = useState([
    { id: 'g1', type: 'H', target: 0, step: 0 },
    { id: 'g2', type: 'CX', control: 0, target: 1, step: 1 }
  ]);

  // Compute quantum statevector simulation dynamically
  const simulationResult = useMemo(() => {
    return simulateCircuit(numQubits, gatesList);
  }, [numQubits, gatesList]);

  const resetCircuit = () => {
    setGatesList([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative z-10">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        numQubits={numQubits}
        setNumQubits={setNumQubits}
        resetCircuit={resetCircuit}
        gatesCount={gatesList.length}
        simulationResult={simulationResult}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">

        {/* Tab 1: Circuit Studio View */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            
            {/* Presets & Gate Drawer */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GatePalette
                  selectedGateType={selectedGateType}
                  setSelectedGateType={setSelectedGateType}
                  rotationAngle={rotationAngle}
                  setRotationAngle={setRotationAngle}
                />
              </div>
              <div>
                <AlgorithmPresets
                  setNumQubits={setNumQubits}
                  setGatesList={setGatesList}
                />
              </div>
            </div>

            {/* Circuit Canvas */}
            <CircuitCanvas
              numQubits={numQubits}
              gatesList={gatesList}
              setGatesList={setGatesList}
              selectedGateType={selectedGateType}
              rotationAngle={rotationAngle}
              onSimulate={() => setActiveTab('visualizer')}
            />

            {/* Split View: Live Code Editor & Socratic AI Tutor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CodeEditorSync
                numQubits={numQubits}
                gatesList={gatesList}
                setGatesList={setGatesList}
              />
              <SocraticTutorPanel
                numQubits={numQubits}
                gatesList={gatesList}
                simulationResult={simulationResult}
              />
            </div>

          </div>
        )}

        {/* Tab 2: Visualizer (Bloch Spheres, Probability Histogram, Statevector Table, Endian Matrix) */}
        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            
            {/* Bloch Spheres Grid */}
            <div className="space-y-3">
              <h2 className="font-orbitron font-extrabold text-base text-cyan-300 text-holo-cyan">Individual Qubit Bloch Spheres (Drag to Rotate 3D)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {simulationResult.blochSpheres.map((bloch) => (
                  <BlochSphereCanvas key={bloch.qubit} blochData={bloch} />
                ))}
              </div>
            </div>

            {/* Probability Histogram & Statevector Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProbabilityHistogram probabilities={simulationResult.probabilities} />
              <StatevectorTable
                probabilities={simulationResult.probabilities}
                entanglementInfo={simulationResult.entanglementInfo}
              />
            </div>

            {/* Cross-Framework Endianness Matrix */}
            <EndianMatrixView
              probabilities={simulationResult.probabilities}
              numQubits={numQubits}
            />

          </div>
        )}

        {/* Tab 3: Misconception Lab */}
        {activeTab === 'misconceptions' && (
          <MisconceptionCard
            numQubits={numQubits}
            setNumQubits={setNumQubits}
            setGatesList={setGatesList}
            onSimulate={() => setActiveTab('visualizer')}
          />
        )}

        {/* Tab 4: Curriculum LMS & Tracks */}
        {activeTab === 'lms' && (
          <CurriculumTracks
            setNumQubits={setNumQubits}
            setGatesList={setGatesList}
            completedLessons={completedLessons}
            setCompletedLessons={setCompletedLessons}
          />
        )}

        {/* Tab 5: Skill Passport */}
        {activeTab === 'passport' && (
          <SkillPassport completedLessons={completedLessons} />
        )}

        {/* Tab 6: Instructor Dashboard */}
        {activeTab === 'instructor' && (
          <InstructorDashboard />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
