import React from 'react';
import { Tool } from '../types';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, MoreVertical } from 'lucide-react';
import { GeminiAssistant } from '../components/GeminiAssistant';

// Import tool components
import { OhmsLawTool } from '../components/tools/OhmsLawTool';
import { ResistorCodeTool } from '../components/tools/ResistorCodeTool';
import { PwmCalculatorTool } from '../components/tools/PwmCalculatorTool';
import { CapacitorCalcTool } from '../components/tools/CapacitorCalcTool';
import { WireGaugeTool } from '../components/tools/WireGaugeTool';
import { TorqueCalculatorTool } from '../components/tools/TorqueCalculatorTool';
import { GearRatioTool } from '../components/tools/GearRatioTool';
import { RpmSpeedTool } from '../components/tools/RpmSpeedTool';
import { SpringRateTool } from '../components/tools/SpringRateTool';
import { ConcreteCalcTool } from '../components/tools/ConcreteCalcTool';
import { SlopeGradeTool } from '../components/tools/SlopeGradeTool';
import { BoardFootTool } from '../components/tools/BoardFootTool';
import { FinishCoverageTool } from '../components/tools/FinishCoverageTool';
import { DovetailAngleTool } from '../components/tools/DovetailAngleTool';
import { JsonFormatterTool } from '../components/tools/JsonFormatterTool';
import { RegexTesterTool } from '../components/tools/RegexTesterTool';
import { HashGeneratorTool } from '../components/tools/HashGeneratorTool';
import { TimestampConverterTool } from '../components/tools/TimestampConverterTool';
import { Base64Tool } from '../components/tools/Base64Tool';
import { TokenCounterTool } from '../components/tools/TokenCounterTool';
import { PromptCostTool } from '../components/tools/PromptCostTool';
import { ContextWindowTool } from '../components/tools/ContextWindowTool';
import { ModelComparisonTable } from '../components/tools/ModelComparisonTable';
import { UnitConverterTool } from '../components/tools/UnitConverterTool';
import { RebarWeightTool } from '../components/tools/RebarWeightTool';
import { FlowRateTool } from '../components/tools/FlowRateTool';
import { BeamLoadTool } from '../components/tools/BeamLoadTool';
import { PipeFrictionTool } from '../components/tools/PipeFrictionTool';
import { AsphaltVolumeTool } from '../components/tools/AsphaltVolumeTool';
import { SoilBearingTool } from '../components/tools/SoilBearingTool';
import { ShelfSagTool } from '../components/tools/ShelfSagTool';
import { LevelTool } from '../components/tools/LevelTool';
import { StopwatchTool } from '../components/tools/StopwatchTool';
import { FlashlightTool } from '../components/tools/FlashlightTool';
import { LoanCalculatorTool } from '../components/tools/LoanCalculatorTool';
import { CompoundInterestTool } from '../components/tools/CompoundInterestTool';
import { TipCalculatorTool } from '../components/tools/TipCalculatorTool';
import { CurrencyReferenceTool } from '../components/tools/CurrencyReferenceTool';
import { InvoiceEstimatorTool } from '../components/tools/InvoiceEstimatorTool';
import { RoiCalculatorTool } from '../components/tools/RoiCalculatorTool';
import { BudgetSplitterTool } from '../components/tools/BudgetSplitterTool';
import { BreakEvenTool } from '../components/tools/BreakEvenTool';
import { UrlEncoderTool } from '../components/tools/UrlEncoderTool';
import { ChmodCalcTool } from '../components/tools/ChmodCalcTool';
import { HttpStatusCodesTool } from '../components/tools/HttpStatusCodesTool';
import { CurlBuilderTool } from '../components/tools/CurlBuilderTool';
import { PasswordGenTool } from '../components/tools/PasswordGenTool';
import { JwtTool } from '../components/tools/JwtTool';
import { CaesarCipherTool } from '../components/tools/CaesarCipherTool';
import { ColorPickerTool } from '../components/tools/ColorPickerTool';
import { GradientGenTool } from '../components/tools/GradientGenTool';
import { TextDiffTool } from '../components/tools/TextDiffTool';
import { MimeTypesTool } from '../components/tools/MimeTypesTool';
import { TermuxRefTool } from '../components/tools/TermuxRefTool';

interface ToolDetailProps {
  tool: Tool;
  onClose: () => void;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ tool, onClose }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const renderContent = () => {
    switch (tool.id) {
      case 'ohms-law':
        return <OhmsLawTool />;
      case 'resistor-code':
        return <ResistorCodeTool />;
      case 'pwm-calc':
        return <PwmCalculatorTool />;
      case 'capacitor-calc':
        return <CapacitorCalcTool />;
      case 'wire-gauge':
        return <WireGaugeTool />;
      case 'bolt-torque':
        return <TorqueCalculatorTool />;
      case 'gear-ratio':
        return <GearRatioTool />;
      case 'rpm-speed':
        return <RpmSpeedTool />;
      case 'spring-rate':
        return <SpringRateTool />;
      case 'concrete-calc':
        return <ConcreteCalcTool />;
      case 'slope-grade':
        return <SlopeGradeTool />;
      case 'rebar-weight':
        return <RebarWeightTool />;
      case 'flow-rate':
        return <FlowRateTool />;
      case 'beam-load':
        return <BeamLoadTool />;
      case 'pipe-friction':
        return <PipeFrictionTool />;
      case 'asphalt-volume':
        return <AsphaltVolumeTool />;
      case 'soil-bearing':
        return <SoilBearingTool />;
      case 'board-foot':
        return <BoardFootTool />;
      case 'finish-coverage':
        return <FinishCoverageTool />;
      case 'dovetail-angle':
        return <DovetailAngleTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'regex-tester':
        return <RegexTesterTool />;
      case 'timestamp-converter':
        return <TimestampConverterTool />;
      case 'hash-generator':
        return <HashGeneratorTool />;
      case 'token-counter':
        return <TokenCounterTool />;
      case 'prompt-cost':
        return <PromptCostTool />;
      case 'context-window':
        return <ContextWindowTool />;
      case 'model-comparison':
        return <ModelComparisonTable />;
      case 'loan-calc':
        return <LoanCalculatorTool />;
      case 'compound-interest':
        return <CompoundInterestTool />;
      case 'tip-calc':
        return <TipCalculatorTool />;
      case 'currency-ref':
        return <CurrencyReferenceTool />;
      case 'invoice-estimator':
        return <InvoiceEstimatorTool />;
      case 'roi-calc':
        return <RoiCalculatorTool />;
      case 'budget-split':
        return <BudgetSplitterTool />;
      case 'break-even':
        return <BreakEvenTool />;
      case 'base64-tool':
        return <Base64Tool />;
      case 'url-encoder':
        return <UrlEncoderTool />;
      case 'chmod-calc':
        return <ChmodCalcTool />;
      case 'http-status':
        return <HttpStatusCodesTool />;
      case 'curl-builder':
        return <CurlBuilderTool />;
      case 'mime-types':
        return <MimeTypesTool />;
      case 'password-gen':
        return <PasswordGenTool />;
      case 'jwt-tool':
        return <JwtTool />;
      case 'caesar-cipher':
        return <CaesarCipherTool />;
      case 'color-picker':
        return <ColorPickerTool />;
      case 'gradient-gen':
        return <GradientGenTool />;
      case 'text-diff':
        return <TextDiffTool />;
      case 'termux-ref':
        return <TermuxRefTool />;
      case 'shelf-sag':
        return <ShelfSagTool />;
      case 'unit-converter':
        return <UnitConverterTool />;
      case 'level-tool':
        return <LevelTool />;
      case 'stopwatch':
        return <StopwatchTool />;
      case 'flashlight':
        return <FlashlightTool />;
      case 'gemini-assistant':
        return <GeminiAssistant />;
      default:
        return (
          <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-gray-800/50 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-2"
              style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
            >
              {tool.icon}
            </div>
            <h2 className="text-xl font-bold text-white">Logic Placeholder</h2>
            <p className="text-gray-400 text-sm max-w-[240px]">
              The specific interactive logic for the <span className="text-white font-medium">{tool.name}</span> tool will be implemented here.
            </p>
            
            <div className="w-full h-32 bg-[#1a1a2e]/50 rounded-2xl border border-dashed border-gray-800 mt-4 flex items-center justify-center">
              <span className="text-gray-600 text-xs font-mono tracking-tighter">TOOL_CONTENT_AREA</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className="fixed inset-0 z-50 bg-[#0f0f14] flex flex-col mx-auto shadow-2xl"
    >
      <div className="h-[3px] w-full" style={{ backgroundColor: tool.color }} />
      
      <header className="flex items-center justify-between px-4 py-5 border-b border-gray-800/50 bg-[#0f0f14]/80 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-base font-black text-white leading-none mb-1">{tool.name}</h1>
            <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: tool.color }}>
              {tool.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 active:scale-95 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 active:scale-95 transition-all">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8"
        >
          <motion.div variants={item}>
            {renderContent()}
          </motion.div>

          <motion.div variants={item} className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-[#2a2a3a]/50" />
              <h3 className="text-[10px] font-bold text-[#aaaacc] uppercase tracking-[0.2em]">Documentation</h3>
              <div className="h-px flex-1 bg-[#2a2a3a]/50" />
            </div>
            <div className="bg-[#1a1a2e] rounded-3xl p-6 border border-[#2a2a3a]/50">
              <p className="text-gray-400 text-sm leading-relaxed italic">
                {tool.longDescription}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};
