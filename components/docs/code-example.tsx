"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Light as LightSyntaxHighlighter } from "react-syntax-highlighter";
import curl from "highlightjs-curl";
import { useState } from "react";
import { Button } from "../ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ProgrammingLanguageExample {
  title: string;
  languageName: string; // for code highlighting
  code: string;
}

interface Props {
  data: ProgrammingLanguageExample[];
  className?: string;
}

export const CodeExample = ({ data, className }: Props) => {
  LightSyntaxHighlighter.registerLanguage("curl", curl);
  const [selectedLanguage, setSelectedLanguage] = useState(data[0].title);
  const [copied, setCopied] = useState(false);

  const selectedLanguageExample = data.find(
    (example) => example.title === selectedLanguage,
  )?.code;

  const onClickCopyButton = async (text?: string) => {
    if (!copied && text) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied successfully");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        toast.error("Copy failed. Try again");
      }
    }
  };

  return (
    <Tabs
      className={cn("relative p-3 rounded-xl", className)}
      value={selectedLanguage}
      onValueChange={setSelectedLanguage}
    >
      <TabsList
        defaultValue={selectedLanguage}
        className="absolute top-10 left-5 bg-transparent mb-3 rounded-none w-full justify-between p-2"
      >
        <div className="flex gap-2">
          {data.map((example) => (
            <TabsTrigger value={example.title} key={example.title}>
              {example.title}
            </TabsTrigger>
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={() => onClickCopyButton(selectedLanguageExample)}
          className="mr-7"
        >
          {copied ? (
            <>
              <CheckIcon />
              Copied!
            </>
          ) : (
            <>
              <CopyIcon />
              Copy snippet
            </>
          )}
        </Button>
      </TabsList>
      {data.map((example) => (
        <TabsContent key={example.title} value={example.title}>
          <SyntaxHighlighter
            customStyle={{ paddingTop: 80, borderRadius: "12px" }}
            language={example.languageName}
            style={atomOneDark}
            showLineNumbers={true}
          >
            {example.code}
          </SyntaxHighlighter>
        </TabsContent>
      ))}
    </Tabs>
  );
};
