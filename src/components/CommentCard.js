import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm } from "react-hook-form";
import draftToHtml from "draftjs-to-html";


const CommentCard = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    


    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const onSubmit = () => {
        let commentData =  draftToHtml(convertToRaw(editorState.getCurrentContent()))
        //  editorState.getCurrentContent().getPlainText('\u0001')

    }
    return (
        <>
            <div className="relative p-6 flex-auto cursor-auto">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <span className='text-base font-medium' >Yorum Ekle</span>
                    </div>
                    <div className='border-solid border mt-4 mb-4 border-gray-200 h-56'>
                        <Editor
                            handlePastedText={() => false}
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={onEditorStateChange}
                        />
                    </div>


                    <div className='flex  mt-2 items-center float-right'>
                        <button className='bg-green-600 w-20 h-8 text-white font-medium text-base rounded-sm'>
                            Ekle
                        </button>
                    </div>
                </form>

            </div>

            <div className='p-6'>

                <span className='text-base font-semibold mt-2' >Yorumlar</span>
                <br />

                <div className='bg-white hover:bg-gray-100 rounded-lg shadow-xl p-3 mb-2'>
                    şlsdkfoerkfoıerjgoreıj
                </div>
              
            </div>
        </>
    )
}

export default CommentCard