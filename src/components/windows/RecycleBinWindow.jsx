import React from 'react';

export default function RecycleBinWindow() {
  return (
    <div className="bin-body">
      <i className="bx bx-trash bin-empty-icon"></i>
      <p>Recycle Bin is empty.</p>
      <p className="bin-sub">No old ideas thrown away here — only shipped ones.</p>
    </div>
  );
}
