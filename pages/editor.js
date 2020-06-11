import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  createEditor,
  Node,
  Element,
  Text,
  Editor,
  Transforms,
  Range,
} from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Navbar from '../components/Navbar';
import { ContentContainer } from '../components/Containers';
import markdownToHtml from '../utils/markdown-to-html';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const blockToString = (node) => {
  return node.children.map((n) => Node.string(n)).join('\n');
};
function withCustomShit(editor) {
  const { insertText, insertBreak, normalizeNode } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;
    if (text !== ' ' && selection && Range.isCollapsed(selection)) {
      Transforms.wrapNodes(
        editor,
        { type: 'block', children: [] },
        {
          match: (n) => n.type === 'empty_void',
        }
      );
      Transforms.setNodes(
        editor,
        { type: 'line' },
        {
          match: (n) => n.type === 'empty_void',
        }
      );
    }

    insertText(text);
  };

  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const [blockNode, path] = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      const blockString = Node.string(blockNode);
      if (blockString === '') {
        Transforms.setNodes(editor, { type: 'empty_void' });
        Transforms.liftNodes(editor);
      }
    }
    insertBreak();
  };
  return editor;
}

function SlateEditor() {
  const editor = useMemo(() => withCustomShit(withReact(createEditor())), []);

  const [value, setValue] = useState([
    {
      type: 'block',
      children: [
        {
          type: 'line',
          children: [{ text: 'This is the title' }],
        },
        { type: 'line', children: [{ text: '===' }] },
      ],
    },
    { type: 'empty_void', children: [{ text: '' }] },
    {
      type: 'block',
      children: [
        {
          type: 'line',
          children: [{ text: 'This is the paragraph' }],
        },
      ],
    },
  ]);

  function onEditorChange(newValue) {
    setValue(newValue);
  }

  return (
    <AuthenticatedRoute className="h-screen">
      <Navbar />
      <ContentContainer>
        <div className="flex flex-col h-full sm:mx-auto sm:w-full sm:max-w-md">
          <span className="block text-sm font-medium leading-5 text-gray-900">
            SnidBit Editor:
          </span>
          <div className="flex flex-col h-full">
            <Slate editor={editor} value={value} onChange={onEditorChange}>
              <Editable className="rounded-md overflow-auto flex-auto shadow-sm w-full px-3 py-2 border border-gray-300 shadow rounded-md placeholder-gray-400 min-h-64" />
            </Slate>
          </div>
        </div>
        <div>{console.log('CurrVal', value)}</div>
      </ContentContainer>
    </AuthenticatedRoute>
  );
}

export default SlateEditor;
