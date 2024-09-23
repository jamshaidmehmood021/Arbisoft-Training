import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type ProjectInput = {
    name: string;
    budget: string;
    deadline: string;
    description: string;
    files: FileList | null;
};

type EditorType = "Gig";
type SuggestionPosition = { start: number; end: number };

const TextEditor = ({
    value,
    setValue,
    placeholder,
    type,
    ...props
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    type: EditorType;
}) => {
    const quillRef = useRef<ReactQuill>(null);

    const suggestionTimeOutRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isSuggesting = useRef(false);
    const suggestionPosition = useRef<SuggestionPosition>({ start: 0, end: 0 });

    const [suggestion, setSuggestion] = useState("");

    const handleChange = (value: string) => {
        setValue(value);
    };

    const resetSuggestionPosition = () => {
        suggestionPosition.current = { start: 0, end: 0 };
    };

    const getQuillEditor = () => {
        if (quillRef.current) {
            return quillRef.current.getEditor();
        }
        return null;
    };

    const isCursorAtEnd = () => {
        const quill = getQuillEditor();
        if (!quill) return false;

        const selection = quill.getSelection();
        if (selection) {
            const cursorPosition = selection.index;
            const textLength = quill.getText().length - 1;
            return cursorPosition >= textLength;
        }
        return false;
    };

    const clearSuggestionText = () => {
        const quill = getQuillEditor();
        if (isSuggesting.current && quill) {
            quill.deleteText(suggestionPosition.current.start, suggestionPosition.current.end);
        }
    };

    const handleTab = (event: KeyboardEvent, quill: Quill) => {
        if (event.key !== "Tab") return;
        event.preventDefault();

        const selection = quill.getSelection();
        if (!isSuggesting.current || !selection) return;

        quill.insertText(selection.index, suggestion, "api");
        quill.setSelection(quill.getLength(), 0);

        resetSuggestionPosition();
    };

    const getAiSuggestion = async (currentDescription: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response: any = await fetch(
                `http://localhost:5000/suggestions?description=${currentDescription}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setSuggestion(data.suggestion);
        } catch (e: any) {
            console.log("Failed to get suggestion", e);
        }
    };

    const updateSuggestion = (quill: Quill, source: string) => {
        if (source === "api") return;
        clearSuggestionText();

        if (suggestionTimeOutRef.current) clearTimeout(suggestionTimeOutRef.current);
        suggestionTimeOutRef.current = setTimeout(async () => {
            await getAiSuggestion(quill.getText(0, quill.getLength()));
        }, 3000);
    };

    useEffect(() => {
        const quill = getQuillEditor();
        if (!suggestion || !quill) return;

        const selection = quill.getSelection();
        if (selection && isCursorAtEnd()) {
            const cursorPosition = selection.index;
            isSuggesting.current = true;

            clearSuggestionText();

            suggestionPosition.current = {
                start: cursorPosition,
                end: cursorPosition + 1 + suggestion.length,
            };

            quill.insertText(cursorPosition, suggestion, {
                color: "rgba(0,0,0,0.3)",
                "user-select": "none",
            });

            quill.setSelection(cursorPosition, 0);
        }
    }, [suggestion]);

    useEffect(() => {
        const quill = getQuillEditor();
        if (!quill || type !== "Gig") return;

        quill.on("text-change", (_, __, source) => updateSuggestion(quill, source));
        quill.on("selection-change", (_, __, source) => {
            if (source === "user") {
                clearSuggestionText();
                isSuggesting.current = false;
                resetSuggestionPosition();
            }
        });

        const tabListener = (e: KeyboardEvent) => handleTab(e, quill);
        document.addEventListener("keydown", tabListener);

        return () => {
            document.removeEventListener("keydown", tabListener);
        };
    }, [suggestion]);

    return (
        <div className="w-full">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="w-full h-64 pb-11 bg-white"
                {...props}
            />
        </div>
    );
};

export default TextEditor;
