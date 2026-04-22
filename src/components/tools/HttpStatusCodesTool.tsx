import React from 'react';

export const HttpStatusCodesTool = () => {
  const codes = [
    { code: 200, name: 'OK', desc: 'Standard response for successful HTTP requests.' },
    { code: 201, name: 'Created', desc: 'The request has been fulfilled, resulting in the creation of a new resource.' },
    { code: 204, name: 'No Content', desc: 'The server successfully processed the request and is not returning any content.' },
    { code: 400, name: 'Bad Request', desc: 'The server cannot or will not process the request due to an apparent client error.' },
    { code: 401, name: 'Unauthorized', desc: 'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.' },
    { code: 403, name: 'Forbidden', desc: 'The request contained valid data and was understood by the server, but the server is refusing action.' },
    { code: 404, name: 'Not Found', desc: 'The requested resource could not be found but may be available in the future.' },
    { code: 405, name: 'Method Not Allowed', desc: 'A request method is not supported for the requested resource.' },
    { code: 500, name: 'Internal Server Error', desc: 'A generic error message, given when an unexpected condition was encountered.' },
    { code: 502, name: 'Bad Gateway', desc: 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.' },
    { code: 503, name: 'Service Unavailable', desc: 'The server cannot handle the request (because it is overloaded or down for maintenance).' },
  ];

  return (
    <div className="flex flex-col gap-4">
      {codes.map((c) => (
        <div key={c.code} className="bg-[#1a1a2e] border border-[#2a2a3a] rounded-2xl p-4 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black ${c.code < 300 ? 'bg-green-500/20 text-green-400' : c.code < 500 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
              {c.code}
            </span>
            <h3 className="text-white font-bold text-sm">{c.name}</h3>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  );
};
