import React from "react";
import { Card } from 'react-bootstrap';
import { MonacoDiffEditor } from 'react-monaco-editor';
import { js as beautify } from "js-beautify";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import parserBabel from "prettier/parser-babel";
import parserCss from "prettier/parser-postcss";
import phpPlugin from "@prettier/plugin-php/standalone";

var javaToJavascript = require("java-to-javascript");



interface CodeComparisonProps {
  similarity: number | null;
  lessonLanguage: string;
  codeSolution: string;
  code: string;
  showCodeSolution: boolean;
}

const CodeComparison: React.FC<CodeComparisonProps> = ({
  similarity,
  lessonLanguage,
  codeSolution,
  showCodeSolution,
  code,
}) => {

  if (
    showCodeSolution === false
  ) {
    return null;
  }

  const isCorrect = (similarity ?? 0) >= 85;
  function formatCode(code: string, language: string): string {
    try {
      let parser;
      // Determine the parser based on the language
      switch (language) {
        case "html":
        case "htmlCss":
        case "htmlJs":
        case "htmlCssJs":
          parser = "html";
          break;
        case "css":
          parser = "css";
          break;
        case "js":
          parser = "babel";
          break;
        case "java":
          parser = "java";
          break;
        case "php":
          parser = "php";
          code = code.replace("<?php", "<?php\n");
          const lastIndex = code.lastIndexOf("?>");
          code = `${code.slice(0, lastIndex)}\n${code.slice(lastIndex)}`;
          break;
        case "csharp":
          parser = "csharp";
          break;
        default:
          // fallback to HTML if language is not recognized
          parser = "html";
      }
  
      if (parser === "java") {
        const formattedJavaCode1 = beautify(code, {
          indent_size: 2,
          indent_with_tabs: false,
          eol: "\n",
          preserve_newlines: true,
          brace_style: "collapse",
          space_in_empty_paren: true,
          keep_array_indentation: true,
        });
        console.log(formattedJavaCode1);
        var jsString = javaToJavascript(formattedJavaCode1);
        console.log(jsString);
        return formattedJavaCode1;
      } else {
        return prettier.format(code, {
          parser: parser,
          plugins: [parserHtml, parserBabel, parserCss, phpPlugin],
        });
      }
    } catch (error) {
      console.error("Fehler beim Formatieren des Codes:", error);
      return code;
    }
  }
  
  const formattedCorrectAnswer = formatCode(codeSolution, lessonLanguage);
  
  return (
    <Card style={{ width: '100vw', marginTop: "5vw" }}>
      <Card.Header as="h2">Lösung</Card.Header>
      <Card.Body style={{ height: 'auto' }}>
        <div className={`alert ${isCorrect ? "alert-success" : "alert-danger"}`} role="alert">
          Ihr Code ist zu {(similarity ?? 0).toFixed(2)}% korrekt!{" "}
          {isCorrect ? "Glückwunsch!" : "Versuchen Sie es erneut."}
        </div>
        <Card.Text>
          Hier wird die Lösung (links) mit Ihrem Code (rechts) verglichen.
        </Card.Text>
        <MonacoDiffEditor
          width="100%"
          height="300px"
          language={lessonLanguage}
          theme="vs-dark"
          original={formattedCorrectAnswer}
          value={code}
          options={{
            readOnly: true,
            renderSideBySide: true,
            automaticLayout: true,
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default CodeComparison;
