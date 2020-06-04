import React, { useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Navbar from '../components/Navbar';
import { ContentContainer } from '../components/Containers';

function Editor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  return (
    <AuthenticatedRoute className="h-screen">
      <Navbar />
      <ContentContainer>
        <div className="flex flex-col h-full sm:mx-auto sm:w-full sm:max-w-md">
          <span className="block text-sm font-medium leading-5 text-gray-900">
            SnidBit Editor:
          </span>
          <div className="flex flex-col h-full">
            <Slate
              editor={editor}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            >
              <Editable className="rounded-md overflow-auto flex-auto shadow-sm w-full px-3 py-2 border border-gray-300 shadow rounded-md placeholder-gray-400 min-h-64" />
            </Slate>
          </div>
        </div>
      </ContentContainer>
    </AuthenticatedRoute>
  );
}

export default Editor;
