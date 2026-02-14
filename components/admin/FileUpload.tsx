import React, { useState } from 'react';

interface FileUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  accept?: string;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, currentImage, accept = "image/*", maxSize = 5 }) => {
  const [preview, setPreview] = useState(currentImage);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`O ficheiro excede ${maxSize}MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setPreview(url);
        onUpload(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative group">
        {preview ? (
          <>
            <img src={preview} className="w-full h-full object-cover transition-all group-hover:scale-110" alt="Preview" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Substituir Imagem</span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <span className="text-4xl mb-2 block opacity-20">📸</span>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Carregar Ativo Visual</p>
          </div>
        )}
        <input type="file" accept={accept} onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center italic">Máximo: {maxSize}MB • Formatos recomendados: PNG, JPG (1200x800px)</p>
    </div>
  );
};