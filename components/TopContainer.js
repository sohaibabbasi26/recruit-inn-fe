import 'react-quill/dist/quill.snow.css';
import styles from './TopContainer.module.css';
import dynamic from 'next/dynamic';
import React, { useEffect, useState, useRef } from 'react';
const TopContainer = ({setDescription,description}) => {
    const [QuillNoSSRWrapper, setQuillNoSSRWrapper] = useState(null);
    const [value, setValue] = useState('');
    const quillRef = useRef(null);
    useEffect(() => {
        const loadQuill = async () => {
            const { default: RQuill } = await import('react-quill');
            const QuillWrapper = React.forwardRef((props, ref) => <RQuill ref={ref} {...props} />);
            setQuillNoSSRWrapper(() => QuillWrapper);
        };
        loadQuill();
    }, []);
    useEffect(() => {
        if (quillRef.current) {
            const toolbar = quillRef.current.querySelector('.ql-toolbar.ql-snow');
            const container = quillRef.current.querySelector('.ql-container.ql-snow');
            if (toolbar) toolbar.style.border = 'none';
            if (container) container.style.border = 'none';
        }
    }, [quillRef.current]);
    useEffect(()=> {
        setDescription(value);
    },[value]);
    useEffect(() => {
        const plainText = convertHtmlToPlainText(value);
        setDescription(plainText);
        console.log('value:', value);
        console.log('description:', description)
    }, [value]);
<<<<<<< HEAD


=======
>>>>>>> 0dbff317daf4bc2a35a0677d254f4fdcbaf03c7d
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (false) {
            event.preventDefault();
<<<<<<< HEAD
    
            const activeElement = document.activeElement;
    
=======
            const activeElement = document.activeElement;
>>>>>>> 0dbff317daf4bc2a35a0677d254f4fdcbaf03c7d
           if (activeElement.tagName === 'INPUT' && activeElement.form) {
              const form = activeElement.form;
              const submitButton = form.querySelector('[type="submit"]');
              if (submitButton) {
                submitButton.click();
              }
            } else {
<<<<<<< HEAD
              const continueButton = document.getElementById('RightBottomBtns_forwardBtn__83dJ2'); 
=======
              const continueButton = document.getElementById('RightBottomBtns_forwardBtn__83dJ2');
>>>>>>> 0dbff317daf4bc2a35a0677d254f4fdcbaf03c7d
              if (continueButton) {
                continueButton.click();
              }
            }
          }
        };
<<<<<<< HEAD
    
        window.addEventListener('keydown', handleKeyDown);
    
=======
        window.addEventListener('keydown', handleKeyDown);
>>>>>>> 0dbff317daf4bc2a35a0677d254f4fdcbaf03c7d
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
<<<<<<< HEAD

=======
>>>>>>> 0dbff317daf4bc2a35a0677d254f4fdcbaf03c7d
    // useEffect(() => {
    //     if (description !== undefined && value !== description) {
    //         setValue(description);
    //     }
    // }, [description]);
    // useEffect(()=> {
    //     if (value !== undefined) {
    //         const plainText = convertHtmlToPlainText(value);
    //         setDescription(plainText);
    //         console.log('value:', value);
    //         console.log('description:', description);
    //     }
    // }, [value]);
    useEffect(() => {
        setValue(description || '');
    }, []);
    const convertHtmlToPlainText = (html) => {
        const tempDivElement = document.createElement("div");
        tempDivElement.innerHTML = html;
        return tempDivElement.textContent || tempDivElement.innerText || "";
    };
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'code-block'],
            ['blockquote']
        ],
    };
    const placeholder =
    `About us:
            Write about your company...
    Job Description:
            Describe your job position...
    `;
    return (
        <>
            <div className={styles.super} ref={quillRef}>
                {QuillNoSSRWrapper && (
                    <QuillNoSSRWrapper placeholder={placeholder} className={styles.editor} modules={modules} value={value} onChange={setValue} />
                )}
            </div>
        </>
    )
}
export default TopContainer;