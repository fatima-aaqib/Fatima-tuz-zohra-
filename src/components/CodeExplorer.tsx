import React, { useState } from 'react';
import { ProjectCodeFile, ThemeMode } from '../types/portfolio';
import { Copy, Check, Download, FileCode, Terminal, Sparkles } from 'lucide-react';

interface CodeExplorerProps {
  files: ProjectCodeFile[];
  theme: ThemeMode;
  projectTitle: string;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ files, theme, projectTitle }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const isDark = theme === 'dark';
  const activeFile = files[selectedFileIndex] || files[0];

  if (!files || files.length === 0) {
    return (
      <div className="p-8 text-center text-stone-500 font-mono text-xs">
        No source code files attached for this repository yet.
      </div>
    );
  }

  const handleCopyCode = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const lines = activeFile.content.split('\n');

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${
      isDark ? 'bg-[#0f0d0b] border-stone-800' : 'bg-[#f7f4ee] border-stone-300 shadow-sm'
    }`}>
      {/* File Navigation Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b ${
        isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-stone-200/70 border-stone-300'
      }`}>
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {files.map((file, idx) => {
            const isActive = idx === selectedFileIndex;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFileIndex(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? isDark
                      ? 'bg-stone-800 text-[#dfb692] font-semibold border border-stone-700 shadow-xs'
                      : 'bg-white text-[#9c6738] font-bold border border-stone-300 shadow-xs'
                    : isDark
                    ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-850'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 ${isActive ? 'text-[#c28b5e]' : 'text-stone-500'}`} />
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls: Copy & Download */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCode}
            aria-label="Copy file content to clipboard"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
              isDark
                ? 'bg-stone-850 hover:bg-stone-800 border-stone-700 text-stone-200'
                : 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800 shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#c28b5e]" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadFile}
            aria-label={`Download ${activeFile.name}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#9c6738] hover:bg-[#85542b] text-white transition-all cursor-pointer shadow-xs border border-[#c28b5e]/40"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* File Purpose Sub-bar */}
      <div className={`px-4 py-2 text-[11px] font-mono border-b flex items-center justify-between ${
        isDark ? 'bg-stone-950/60 border-stone-800/80 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-[#c28b5e] font-semibold uppercase">{activeFile.language}</span>
          <span>·</span>
          <span className="truncate">{activeFile.description}</span>
        </div>
        <div className="text-[10px] text-stone-500 whitespace-nowrap">
          {lines.length} lines · UTF-8
        </div>
      </div>

      {/* Code Text Display Area with Line Numbers */}
      <div className="max-h-[500px] overflow-y-auto overflow-x-auto p-4 font-mono text-xs leading-relaxed selection:bg-[#c28b5e]/30 selection:text-[#faeedd]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, lineIndex) => {
              // Basic highlighting cues
              const isComment = line.trim().startsWith('#') || line.trim().startsWith('//') || line.trim().startsWith('"""') || line.trim().startsWith('*');
              const isImport = line.trim().startsWith('import') || line.trim().startsWith('from') || line.trim().startsWith('export');
              const isClassOrDef = line.trim().startsWith('class ') || line.trim().startsWith('def ') || line.trim().startsWith('interface ') || line.trim().startsWith('function ');

              return (
                <tr key={lineIndex} className="hover:bg-[#c28b5e]/5 transition-colors group">
                  <td className="w-10 text-right pr-4 text-stone-600 select-none text-[11px] border-r border-stone-800/60 group-hover:text-stone-400">
                    {lineIndex + 1}
                  </td>
                  <td className="pl-4 whitespace-pre">
                    <span
                      className={
                        isComment
                          ? 'text-stone-500 italic'
                          : isImport
                          ? isDark ? 'text-[#dfb692] font-semibold' : 'text-[#9c6738] font-bold'
                          : isClassOrDef
                          ? isDark ? 'text-[#c28b5e] font-bold' : 'text-[#85542b] font-bold'
                          : isDark
                          ? 'text-stone-200'
                          : 'text-stone-900'
                      }
                    >
                      {line || '\n'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Code Card Footer */}
      <div className={`p-3 px-4 border-t text-[11px] font-mono flex items-center justify-between ${
        isDark ? 'bg-stone-950/80 border-stone-800 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'
      }`}>
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#c28b5e]" />
          <span>Repository Module: {projectTitle}</span>
        </div>
        <span className="text-[#c28b5e]">MIT Licensed · Free to inspect & run</span>
      </div>
    </div>
  );
};
