import { Code2, PenLine, Lightbulb, Sparkles } from "lucide-react";

const suggestions = [
  {
    id: 1,
    icon: Code2,
    label: "Review code",
    sublabel: "Analyze Python snippets",
    prompt: "Review my Python code and suggest improvements.",
  },
  {
    id: 2,
    icon: PenLine,
    label: "Draft email",
    sublabel: "Professional tone for leads",
    prompt: "Draft a professional sales email for a SaaS lead.",
  },
  {
    id: 3,
    icon: Lightbulb,
    label: "Brainstorm",
    sublabel: "Marketing ideas for SaaS",
    prompt: "Brainstorm marketing ideas for a SaaS product.",
  },
];

interface EmptyChatProps {
  onSuggestion: (prompt: string) => void;
}

export default function EmptyChat({ onSuggestion }: EmptyChatProps) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col  items-center gap-4 text-center  mt-24">
        <div className="w-14 h-14 rounded-2xl bg-card border border-surface shadow-sm flex items-center justify-center">
          <Sparkles size={24} className="text-primary-600" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-text tracking-tight leading-tight">
            New Chat
          </h1>

          <p className="text-[15px] text-text-muted leading-[1.6] max-w-[340px]">
            Start a conversation with Chattie. Ask anything from technical
            analysis to creative writing.
          </p>
        </div>
      </div>

      {/* Suggestion cards */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 gap-3 mt-4 w-full pb-4 sm:pb-0 snap-x scrollbar-hide">
        {suggestions.map(({ id, icon: Icon, label, sublabel, prompt }) => (
          <button
            key={id}
            onClick={() => onSuggestion(prompt)}
            className="group bg-card border cursor-pointer border-surface rounded-2xl p-3 sm:p-4 text-left hover:border-primary-200 hover:shadow-md transition-all duration-200 flex flex-row sm:flex-col items-center sm:items-start gap-3 shrink-0 snap-center w-[80%] sm:w-auto"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-600/10 transition-colors">
              <Icon size={16} className="text-primary-600" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-semibold text-text leading-snug">
                {label}
              </span>

              <span className="hidden sm:block text-[12px] text-text-muted">
                {sublabel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
