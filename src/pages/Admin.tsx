import { useEffect, useState } from 'react';
import { useData } from '../context/context';

/* ---------- UI Helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-gray-50 rounded-md space-y-3">
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}

 const PAGE_SECTIONS = {
  dashboard: [],
  home: [
    { key: 'hero', label: 'Hero' },
    { key: 'About', label: 'About' },
    { key: 'Stats', label: 'Stats' },
    { key: 'Values', label: 'Values' },
    { key: 'Services', label: 'Services' },
    { key: 'Team', label: 'Team' },
    { key: 'Partners', label: 'Partners' },
    { key: 'Portfolio', label: 'Portfolio' },
    { key: 'Contact', label: 'Contact' },
  ],
  about: [
    { key: 'Hero', label: 'Hero' },
    { key: 'Stats', label: 'Stats' },
    { key: 'Company', label: 'Company' },
    { key: 'Core Services', label: 'Core Services' },
    { key: 'Closing Note', label: 'Closing Note' },
    { key: 'Mission Vision', label: 'Mission Vision' },
  ],
  portfolio: [
    { key: 'Hero', label: 'Hero' },
    { key: 'Projects', label: 'Projects' },
  ],
  careers: [
    { key: 'Hero', label: 'Hero' },
    { key: 'Why SGCA', label: 'Why SGCA' },
    { key: 'Open Roles', label: 'Open Roles' },
    { key: 'Benefits', label: 'Benefits' },
    { key: 'Apply', label: 'Apply' },
  ],
  contact: [
    { key: 'Hero', label: 'Hero' },
    { key: 'Contact Info', label: 'Contact Info' },
  ],
  leadership: [
    { key: 'Hero', label: 'Hero' },
    { key: 'Leadership Team', label: 'Leadership Team' },
  ],
} as const;

function EditableTable({
  columns,
  data,
  onChange,
  onAdd,
  onDelete,
  addButtonText,
}: {
  columns: Array<{
    key: string;
    label: string;
    type: 'input' | 'textarea' | 'array-input' | 'array-textarea' | 'select' | 'file';
    placeholder?: string;
    options?: string[];
  }>;
  data: any[];
  onChange: (index: number, key: string, value: any) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
  addButtonText: string;
}) {
  return (
    <div className="space-y-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                  {col.type === 'input' && (
                    <input
                      value={item[col.key] || ''}
                      onChange={(e) => onChange(index, col.key, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder={col.placeholder}
                    />
                  )}
                  {col.type === 'textarea' && (
                    <textarea
                      rows={2}
                      value={item[col.key] || ''}
                      onChange={(e) => onChange(index, col.key, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder={col.placeholder}
                    />
                  )}
                  {col.type === 'array-input' && (
                    <input
                      value={(item[col.key] || []).join(', ')}
                      onChange={(e) =>
                        onChange(
                          index,
                          col.key,
                          e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder={col.placeholder}
                    />
                  )}
                  {col.type === 'array-textarea' && (
                    <textarea
                      rows={2}
                      value={(item[col.key] || []).join('\n')}
                      onChange={(e) =>
                        onChange(
                          index,
                          col.key,
                          e.target.value.split('\n').map((s: string) => s.trim()).filter(Boolean)
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder={col.placeholder}
                    />
                  )}
                  {col.type === 'file' && (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          // Do NOT store File objects in form data — only pass filename as placeholder
                          onChange(index, col.key, f ? f.name : '');
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder={col.placeholder}
                      />
                      {item[col.key] && (
                        <div className="mt-1 text-sm text-gray-600">
                          {typeof item[col.key] === 'string' ? item[col.key] : (item[col.key] && item[col.key].name) }
                        </div>
                      )}
                    </>
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onDelete(index)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        {addButtonText}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const { data, loading } = useData();
  const [formData, setFormData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
const [activePage, setActivePage] = useState<
  'dashboard' | 'home' | 'about' | 'contact' | 'careers' | 'portfolio' | 'leadership'
>('dashboard');


  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

 const [selectedFileTeamForm, setSelectedFileTeamForm] = useState<File | null>(null);
  const [selectedFileLeadershipForm, setSelectedFileLeadershipForm] = useState<File | null>(null);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [selectedFilePartnersForm, setSelectedFilePartnersForm] = useState<File | null>(null);
 const [selectedFilePortfolioForm, setSelectedFilePortfolioForm] = useState<File | null>(null);
  const [availableImages, setAvailableImages] = useState<string[]>([]);
 useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
    }
    return;
  }, []);
useEffect(() => {
  if (data) {
    setFormData(JSON.parse(JSON.stringify(data))); // deep copy
  }
}, [data]);
useEffect(() => {
  const firstSection = PAGE_SECTIONS[activePage]?.[0];
  if (firstSection) {
    setActiveSection(firstSection.key);
  } else {
    setActiveSection(null);
  }
}, [activePage]);



useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);

useEffect(() => {
  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const images = await res.json();
        setAvailableImages(images);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };
  fetchImages();
}, []);

const [teamEditingIndex, setTeamEditingIndex] = useState<number | null>(null);
const [teamForm, setTeamForm] = useState({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });

// Home Stats
const [statsEditingIndex, setStatsEditingIndex] = useState<number | null>(null);
const [statsForm, setStatsForm] = useState({ label: '', value: '', icon: '' });

// Home Values
const [valuesEditingIndex, setValuesEditingIndex] = useState<number | null>(null);
const [valuesForm, setValuesForm] = useState({ title: '', description: '' });

// Home Services
const [servicesEditingIndex, setServicesEditingIndex] = useState<number | null>(null);
const [servicesForm, setServicesForm] = useState({ title: '', description: '', icon: '' });

// Home Partners
const [partnersEditingIndex, setPartnersEditingIndex] = useState<number | null>(null);
const [partnersForm, setPartnersForm] = useState({ name: '', url: '', image: '' });

// About Stats
const [aboutStatsEditingIndex, setAboutStatsEditingIndex] = useState<number | null>(null);
const [aboutStatsForm, setAboutStatsForm] = useState({ label: '', value: '', icon: '' });

// About Core Services
const [coreServicesEditingIndex, setCoreServicesEditingIndex] = useState<number | null>(null);
const [coreServicesForm, setCoreServicesForm] = useState({ title: '', points: [] as string[] });

// About Mission Vision
const [missionVisionEditingIndex, setMissionVisionEditingIndex] = useState<number | null>(null);
const [missionVisionForm, setMissionVisionForm] = useState({ title: '', description: '' });

// Portfolio Projects
const [portfolioProjectsEditingIndex, setPortfolioProjectsEditingIndex] = useState<number | null>(null);
const [portfolioProjectsForm, setPortfolioProjectsForm] = useState({ title: '', description: '', image: '', technologies: [] as string[], externalLink: '' });

// Careers Hero CTA
const [careersHeroCtaEditingIndex, setCareersHeroCtaEditingIndex] = useState<number | null>(null);
const [careersHeroCtaForm, setCareersHeroCtaForm] = useState({ label: '', href: '', variant: '' });

// Careers Why SGCA
const [whySgcaEditingIndex, setWhySgcaEditingIndex] = useState<number | null>(null);
const [whySgcaForm, setWhySgcaForm] = useState({ title: '', description: '', icon: '' });

// Careers Open Roles
const [openRolesEditingIndex, setOpenRolesEditingIndex] = useState<number | null>(null);
const [openRolesForm, setOpenRolesForm] = useState({ title: '', type: '', location: '', description: '', requirements: [] as string[], applyLink: '' });

// Careers Benefits
const [benefitsEditingIndex, setBenefitsEditingIndex] = useState<number | null>(null);
const [benefitsForm, setBenefitsForm] = useState({ title: '', icon: '' });

// Contact Info
const [contactInfoEditingIndex, setContactInfoEditingIndex] = useState<number | null>(null);
const [contactInfoForm, setContactInfoForm] = useState({ type: '', value: '' });

// Leadership
const [leadershipEditingIndex, setLeadershipEditingIndex] = useState<number | null>(null);
const [leadershipForm, setLeadershipForm] = useState({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });

 const handleSave = async () => {
  const token = localStorage.getItem('adminToken');

  const sanitizeForUpload = (obj: any): any => {
    if (obj == null) return obj;
    if (obj instanceof File) return obj.name;
    if (Array.isArray(obj)) return obj.map(sanitizeForUpload);
    if (typeof obj === 'object') {
      const out: any = {};
      for (const k of Object.keys(obj)) {
        out[k] = sanitizeForUpload(obj[k]);
      }
      return out;
    }
    return obj;
  };

  const payload = sanitizeForUpload(formData);

  try {
    console.info('Saving payload to backend:', payload);
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.info('Backend response status:', res.status, 'body:', text);

    if (res.ok) {
      alert('Saved');
    } else {
      alert('Error saving data: ' + text);
    }
  } catch (err: any) {
    console.error('Save failed', err);
    alert('Save failed: ' + (err?.message || String(err)));
  }
};

const uploadFile = async (file: File) => {
  const formDataUpload = new FormData();
  formDataUpload.append('image', file);
  const token = localStorage.getItem('adminToken');
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formDataUpload,
  });
  if (res.ok) {
    // Backend returns a success message rather than the filename.
    // Use the original file name as the saved identifier so it can be referenced later.
    // The client will store the filename; rendering will resolve it to a full URL.
    await res.text();
    return file.name;
  } else {
    throw new Error('Upload failed');
  }
};

// Resolve stored image value (filename or full URL) to a full backend URL
const resolveImageUrl = (img?: string) => {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  // Normalize common stored path formats so we don't produce duplicated segments
  // Examples handled:
  // '/images/team/p.png' -> 'team/p.png'
  // 'images/team/p.png' -> 'team/p.png'
  // '/api/images/team/p.png' -> 'team/p.png'
  let path = img.replace(/^\/+/, ''); // remove leading slashes
  path = path.replace(/^api\/images\//i, '');
  path = path.replace(/^images\//i, '');
  return `${import.meta.env.VITE_BACKEND_URL}/api/images/${path}`;
};

// (no-op) kept image resolver above

 const handleLogout = () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
};

 const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStart(e.touches[0].clientX);
};

 const handleTouchEnd = (e: React.TouchEvent) => {
  const touchEnd = e.changedTouches[0].clientX;
  const diff = touchStart - touchEnd;
  if (diff > 50) setSidebarOpen(false); // swipe left to close
  if (diff < -50) setSidebarOpen(true); // swipe right to open
};

 const handleUpload = async () => {
  if (!selectedFile) return;
  const formData = new FormData();
  formData.append('image', selectedFile);
  const token = localStorage.getItem('adminToken');
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (res.ok) {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const images = await res.json();
          setAvailableImages(images);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    fetchImages();
    setSelectedFile(null);
  } else {
    alert('Upload failed');
  }
};

 const handleDelete = async (filename: string) => {
  const token = localStorage.getItem('adminToken');
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/images/${filename}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    setAvailableImages(availableImages.filter(img => img !== filename));
  } else {
    alert('Delete failed');
  }
};


  if (loading) return <div className="p-10">Loading…</div>;

  return (
  <div className="min-h-screen flex bg-gray-100">
    {/* SIDEBAR INDICATOR BUTTON */}
    {isMobile && !sidebarOpen && (
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 bg-gray-200 p-1 rounded-r shadow"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )}

    {/* SIDEBAR */}
    <aside className={`w-64 min-h-screen bg-white border-r fixed z-50 md:relative md:z-auto transition-transform duration-300 ease-in-out ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}>
      <div className="p-4 text-xl font-bold text-orange-600">
        Admin Panel
      </div>

      <nav className="space-y-1 px-2 overflow-y-auto max-h-[calc(100vh-5rem)]">
  {isMobile ? (
    <>
      <button
        onClick={() => { setActivePage('dashboard'); setSidebarOpen(false); }}
        className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-medium ${
          activePage === 'dashboard'
            ? 'bg-orange-100 text-orange-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        DASHBOARD
      </button>
      {[
        'home',
        'about',
        'portfolio',
        'careers',
        'contact',
        'leadership'
      ].map((page) => (
        <div key={page}>
          {/* PAGE BUTTON */}
        <button
          onClick={() => { setActivePage(page as any); setSidebarOpen(false); }}
          className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-medium ${
            (activePage as string) === page
              ? 'bg-orange-100 text-orange-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
            {page.toUpperCase()}
          </button>

          {/* SECTIONS (ONLY IF ACTIVE PAGE) */}
          {activePage === page && PAGE_SECTIONS[page] && (
            <div className="ml-4 mt-1 space-y-1">
              {PAGE_SECTIONS[page].map((section) => (
                <button
                  key={section.key}
                  onClick={() => { setActiveSection(section.key); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded ${
                    activeSection === section.key
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <a
        href="/"
        target="_blank"
        className="w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-100"
      >
        VISIT WEBSITE
      </a>
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-between px-2 py-1 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-100"
      >
        LOGOUT
      </button>
    </>
  ) : (
    [
      'dashboard',
      'home',
      'about',
      'portfolio',
      'careers',
      'contact',
      'leadership'
    ].map((page) => (
      <div key={page}>
        {/* PAGE BUTTON */}
        <button
          onClick={() => setActivePage(page as any)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium ${
            activePage === page
              ? 'bg-orange-100 text-orange-600'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page.toUpperCase()}
        </button>

        {/* SECTIONS (ONLY IF ACTIVE PAGE) */}
        {activePage === page && PAGE_SECTIONS[page] && (
          <div className="ml-4 mt-1 space-y-1">
            {PAGE_SECTIONS[page].map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-3 py-1.5 text-sm rounded ${
                  activeSection === section.key
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    ))
  )}
</nav>


    </aside>

    {/* MAIN */}
    <div
      className="flex-1 flex flex-col overflow-hidden"
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
    >
      {/* TOP BAR */}
      <header className="h-14 bg-orange-500 text-white flex items-center justify-between px-6">
        <h1 className="font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>admin</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* DASHBOARD PAGE */}
        {activePage === 'dashboard' && (
          <>
            <div className="bg-white rounded-lg p-4 md:p-6 shadow mb-6">
              <h2 className="text-2xl font-semibold">
                Welcome back, admin 👋
              </h2>
              <p className="text-gray-500 mt-1">
                Here’s what’s happening with your website today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Sections</p>
                <p className="text-2xl font-bold">27</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-sm text-gray-500">Updated Sections</p>
                <p className="text-2xl font-bold">26</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-sm text-gray-500">Images</p>
                <p className="text-2xl font-bold">{availableImages.length}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow">
                <p className="text-sm text-gray-500">Pages</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </>
        )}

        {/* 🔥 YOUR EXISTING CONTENT — UNCHANGED */}
        {activePage !== 'dashboard' && (
          <div className="bg-white rounded-lg shadow p-4 md:p-6 space-y-8">
            {/* Content */}
          <div className="p-4 md:p-6 space-y-8">
            {/* HOME */}
            {activePage === 'home' && formData && (
              <>
              {activeSection === 'hero' && (
                <Section title="Hero">
                  <Input
                    label="Title Line 1"
                    value={formData.siteData.hero.heading.line1}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          hero: {
                            ...formData.siteData.hero,
                            heading: { ...formData.siteData.hero.heading, line1: value },
                          },
                        },
                      })
                    }
                  />
                  <Input
                    label="Title Line 2"
                    value={formData.siteData.hero.heading.line2}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          hero: {
                            ...formData.siteData.hero,
                            heading: { ...formData.siteData.hero.heading, line2: value },
                          },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.siteData.hero.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          hero: { ...formData.siteData.hero, subtitle: value },
                        },
                      })
                    }
                  />
                  <EditableTable
                    columns={[
                      { key: 'label', label: 'Label', type: 'input' },
                      { key: 'href', label: 'Href', type: 'input' },
                      { key: 'variant', label: 'Variant', type: 'input' },
                    ]}
                    data={formData.siteData.hero.cta || []}
                    onChange={(index, key, value) => {
                      const newCta = [...(formData.siteData.hero.cta || [])];
                      newCta[index] = { ...newCta[index], [key]: value };
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          hero: { ...formData.siteData.hero, cta: newCta },
                        },
                      });
                    }}
                    onAdd={() => {
                      const newCta = [...(formData.siteData.hero.cta || []), { label: '', href: '', variant: '' }];
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          hero: { ...formData.siteData.hero, cta: newCta },
                        },
                      });
                    }}
                    onDelete={(index) => {
                      const newCta = (formData.siteData.hero.cta || []).filter((_: any, idx: number) => idx !== index);
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          hero: { ...formData.siteData.hero, cta: newCta },
                        },
                      });
                    }}
                    addButtonText="Add CTA"
                  />
                </Section>
              )}
                 {activeSection === 'About' && (
                <Section title="About">
                  <Input
                    label="Title"
                    value={formData.siteData.about.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          about: { ...formData.siteData.about, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Description"
                    value={formData.siteData.about.description}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          about: { ...formData.siteData.about, description: value },
                        },
                      })
                    }
                  />
                </Section>
                 )}
                 {activeSection === 'Stats' && (
                <Section title="Stats">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(formData.siteData?.about?.stats || []).map((stat: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.label}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.value}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {stat.icon ? (
                                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: stat.icon }} />
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setStatsEditingIndex(index);
                                  setStatsForm(stat);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newStats = (formData.siteData?.about?.stats || []).filter((_: any, idx: number) => idx !== index);
                                  const newForm = { ...formData, siteData: { ...formData.siteData, about: { ...formData.siteData.about, stats: newStats } } };
                                  setFormData(newForm);
                                  console.log('Home about stats deleted — new siteData.about.stats:', newStats);
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Debug: show current services payloads to help diagnose mismatches */}
                  <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
                    <div className="mb-2 font-medium">Admin services preview (formData.siteData.services):</div>
                    <pre className="max-h-40 overflow-auto text-xs bg-white p-2 rounded border">{JSON.stringify(formData?.siteData?.services, null, 2)}</pre>
                    <div className="mt-2 mb-2 font-medium">Live data.services (from context):</div>
                    <pre className="max-h-40 overflow-auto text-xs bg-white p-2 rounded border">{JSON.stringify(data?.siteData?.services, null, 2)}</pre>
                  </div>
                  <Card>
                    <Input
                      label="Label"
                      value={statsForm.label}
                      onChange={(value) => setStatsForm({ ...statsForm, label: value })}
                    />
                    <Input
                      label="Value"
                      value={statsForm.value}
                      onChange={(value) => setStatsForm({ ...statsForm, value: value })}
                    />
                    <Textarea
                      label="Icon (paste SVG)"
                      value={statsForm.icon}
                      onChange={(value) => setStatsForm({ ...statsForm, icon: value })}
                    />
                    <div className="flex gap-2">
                      {statsEditingIndex !== null ? (
                        <>
                              <button
                                onClick={() => {
                                  const baseStats = Array.isArray(formData.siteData?.about?.stats) ? formData.siteData.about.stats : [];
                                  const newStats = [...baseStats];
                                  if (statsEditingIndex !== null) newStats[statsEditingIndex] = statsForm;
                                  setFormData({
                                    ...formData,
                                    siteData: { ...formData.siteData, about: { ...formData.siteData.about, stats: newStats } },
                                  });
                                  setStatsEditingIndex(null);
                                  setStatsForm({ label: '', value: '', icon: '' });
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                              >
                                Save Changes
                              </button>
                          <button
                            onClick={() => {
                              setStatsEditingIndex(null);
                              setStatsForm({ label: '', value: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const baseStats = Array.isArray(formData.siteData?.about?.stats) ? formData.siteData.about.stats : [];
                            const newStats = [...baseStats, statsForm];
                            setFormData({
                              ...formData,
                              siteData: { ...formData.siteData, about: { ...formData.siteData.about, stats: newStats } },
                            });
                            setStatsForm({ label: '', value: '', icon: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Stat
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
                 )}
                 {activeSection === 'Values' && (
                <Section title="Values">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(formData.siteData.about.values || []).map((value: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{value.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{value.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setValuesEditingIndex(index);
                                  setValuesForm(value);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newValues = (formData.siteData.about.values || []).filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    siteData: {
                                      ...formData.siteData,
                                      about: { ...formData.siteData.about, values: newValues },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Title"
                      value={valuesForm.title}
                      onChange={(value) => setValuesForm({ ...valuesForm, title: value })}
                    />
                    <Textarea
                      label="Description"
                      value={valuesForm.description}
                      onChange={(value) => setValuesForm({ ...valuesForm, description: value })}
                    />
                    <div className="flex gap-2">
                      {valuesEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newValues = [...formData.siteData.about.values];
                              newValues[valuesEditingIndex] = valuesForm;
                              setFormData({
                                ...formData,
                                siteData: {
                                  ...formData.siteData,
                                  about: { ...formData.siteData.about, values: newValues },
                                },
                              });
                              setValuesEditingIndex(null);
                              setValuesForm({ title: '', description: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setValuesEditingIndex(null);
                              setValuesForm({ title: '', description: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newValues = [...formData.siteData.about.values, valuesForm];
                            setFormData({
                              ...formData,
                              siteData: {
                                ...formData.siteData,
                               about: { ...formData.siteData.about, values: newValues },
                              },
                            });
                            setValuesForm({ title: '', description: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Value
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
                 )}

                 {activeSection === 'Services' && (
                <Section title="Services">
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Services Title"
                      value={formData.siteData.services?.title || ''}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          siteData: {
                            ...formData.siteData,
                            services: { ...formData.siteData.services, title: value },
                          },
                        })
                      }
                    />
                    <Textarea
                      label="Services Subtitle"
                      value={formData.siteData.services?.subtitle || ''}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          siteData: {
                            ...formData.siteData,
                            services: { ...formData.siteData.services, subtitle: value },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.siteData.services.items.map((service: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{service.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {service.icon && typeof service.icon === 'string' && service.icon.trim().startsWith('<svg') ? (
                                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: service.icon }} />
                              ) : (
                                <span className="text-sm text-gray-700">{String(service.icon || '—')}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setServicesEditingIndex(index);
                                  setServicesForm(service);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newItems = formData.siteData.services.items.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    siteData: {
                                      ...formData.siteData,
                                      services: { ...formData.siteData.services, items: newItems },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Title"
                      value={servicesForm.title}
                      onChange={(value) => setServicesForm({ ...servicesForm, title: value })}
                    />
                    <Textarea
                      label="Description"
                      value={servicesForm.description}
                      onChange={(value) => setServicesForm({ ...servicesForm, description: value })}
                    />
                    <Input
                      label="Icon (paste SVG or lucide name)"
                      value={servicesForm.icon}
                      onChange={(value) => setServicesForm({ ...servicesForm, icon: value })}
                    />

                    <div className="flex gap-2">
                      {servicesEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newItems = [...formData.siteData.services.items];
                              newItems[servicesEditingIndex] = servicesForm;
                              setFormData({
                                ...formData,
                                siteData: {
                                  ...formData.siteData,
                                  services: { ...formData.siteData.services, items: newItems },
                                },
                              });
                              setServicesEditingIndex(null);
                              setServicesForm({ title: '', description: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setServicesEditingIndex(null);
                              setServicesForm({ title: '', description: '' , icon: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newItems = [...formData.siteData.services.items, servicesForm];
                            setFormData({
                              ...formData,
                              siteData: {
                                ...formData.siteData,
                                services: { ...formData.siteData.services, items: newItems },
                              },
                            });
                            setServicesForm({ title: '', description: '', icon: ''  });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Service
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
                 )}
                 {activeSection === 'Team' && (
                <Section title="Team">
                  <Input
                    label="Title"
                    value={formData.siteData.team.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          team: { ...formData.siteData.team, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.siteData.team.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          team: { ...formData.siteData.team, subtitle: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.siteData.team.members.map((member: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {member.image && (
                                <img
                                  src={resolveImageUrl(member.image)}
                                  alt="Preview"
                                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setTeamEditingIndex(index);
                                  setTeamForm(member);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newMembers = formData.siteData.team.members.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    siteData: {
                                      ...formData.siteData,
                                      team: { ...formData.siteData.team, members: newMembers },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Name"
                      value={teamForm.name}
                      onChange={(value) => setTeamForm({ ...teamForm, name: value })}
                    />
                    <Input
                      label="Role"
                      value={teamForm.role}
                      onChange={(value) => setTeamForm({ ...teamForm, role: value })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFileTeamForm(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {selectedFileTeamForm && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(selectedFileTeamForm)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                      {teamForm.image && !selectedFileTeamForm && (
                        <div className="mt-2">
                          <img
                            src={resolveImageUrl(teamForm.image)}
                            alt="Current"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                    <Textarea
                      label="Bio"
                      value={teamForm.bio}
                      onChange={(value) => setTeamForm({ ...teamForm, bio: value })}
                    />
                    <Input
                      label="LinkedIn"
                      value={teamForm.socials.linkedin}
                      onChange={(value) => setTeamForm({ ...teamForm, socials: { ...teamForm.socials, linkedin: value } })}
                    />
                    <div className="flex gap-2">
                      {teamEditingIndex !== null ? (
                        <>
                          <button
                            onClick={async () => {
                              if (selectedFileTeamForm) {
                                const filename = await uploadFile(selectedFileTeamForm);
                                teamForm.image = filename;
                                setSelectedFileTeamForm(null);
                              }
                              const newMembers = [...formData.siteData.team.members];
                              newMembers[teamEditingIndex] = teamForm;
                              setFormData({
                                ...formData,
                                siteData: {
                                  ...formData.siteData,
                                  team: { ...formData.siteData.team, members: newMembers },
                                },
                              });
                              setTeamEditingIndex(null);
                              setTeamForm({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Update Member
                          </button>
                          <button
                            onClick={() => {
                              setTeamEditingIndex(null);
                              setTeamForm({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });
                              setSelectedFileTeamForm(null);
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            if (selectedFileTeamForm) {
                              const filename = await uploadFile(selectedFileTeamForm);
                              teamForm.image = filename;
                              setSelectedFileTeamForm(null);
                            }
                            const newMembers = [...formData.siteData.team.members, teamForm];
                            setFormData({
                              ...formData,
                              siteData: {
                                ...formData.siteData,
                                team: { ...formData.siteData.team, members: newMembers },
                              },
                            });
                            setTeamForm({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Member
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
                 )}
                 {activeSection === 'Partners' && (
                <Section title="Partners">
                  <Input
                    label="Title"
                    value={formData.siteData.partners.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          partners: { ...formData.siteData.partners, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.siteData.partners.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          partners: { ...formData.siteData.partners, subtitle: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.siteData.partners.logos.map((partner: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partner.url}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {partner.image && (
                                <img
                                  src={resolveImageUrl(partner.image)}
                                  alt="Preview"
                                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setPartnersEditingIndex(index);
                                  setPartnersForm(partner);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newLogos = formData.siteData.partners.logos.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    siteData: {
                                      ...formData.siteData,
                                      partners: { ...formData.siteData.partners, logos: newLogos },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Name"
                      value={partnersForm.name}
                      onChange={(value) => setPartnersForm({ ...partnersForm, name: value })}
                    />
                    <Input
                      label="URL"
                      value={partnersForm.url}
                      onChange={(value) => setPartnersForm({ ...partnersForm, url: value })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFilePartnersForm(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {selectedFilePartnersForm && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(selectedFilePartnersForm)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                      {partnersForm.image && !selectedFilePartnersForm && (
                        <div className="mt-2">
                          <img
                            src={resolveImageUrl(partnersForm.image)}
                            alt="Current"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {partnersEditingIndex !== null ? (
                        <>
                          <button
                            onClick={async () => {
                              const updated = { ...partnersForm } as any;
                              if (selectedFilePartnersForm) {
                                try {
                                  const filename = await uploadFile(selectedFilePartnersForm);
                                  updated.image = filename;
                                } catch (err) {
                                  alert('Image upload failed');
                                  return;
                                }
                                setSelectedFilePartnersForm(null);
                              }
                              const newLogos = [...formData.siteData.partners.logos];
                              newLogos[partnersEditingIndex] = updated;
                              setFormData({
                                ...formData,
                                siteData: {
                                  ...formData.siteData,
                                  partners: { ...formData.siteData.partners, logos: newLogos },
                                },
                              });
                              setPartnersEditingIndex(null);
                              setPartnersForm({ name: '', url: '', image: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setPartnersEditingIndex(null);
                              setPartnersForm({ name: '', url: '', image: '' });
                              setSelectedFilePartnersForm(null);
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            const toAdd = { ...partnersForm } as any;
                            if (selectedFilePartnersForm) {
                              try {
                                const filename = await uploadFile(selectedFilePartnersForm);
                                toAdd.image = filename;
                              } catch (err) {
                                alert('Image upload failed');
                                return;
                              }
                              setSelectedFilePartnersForm(null);
                            }
                            const newLogos = [...formData.siteData.partners.logos, toAdd];
                            setFormData({
                              ...formData,
                              siteData: {
                                ...formData.siteData,
                                partners: { ...formData.siteData.partners, logos: newLogos },
                              },
                            });
                            setPartnersForm({ name: '', url: '', image: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Partner
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
                 )}
                 {activeSection === 'Portfolio' && (
                <Section title="Portfolio">
                  <Input
                    label="Title"
                    value={formData.siteData.portfolio.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          portfolio: { ...formData.siteData.portfolio, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.siteData.portfolio.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          portfolio: { ...formData.siteData.portfolio, subtitle: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.siteData.portfolio.projects.map((p: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {p.image && (
                                <img
                                  src={resolveImageUrl(p.image)}
                                  alt="Preview"
                                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(Array.isArray(p.tech) ? p.tech : Array.isArray(p.technologies) ? p.technologies : []).join(', ')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setPortfolioProjectsEditingIndex(index);
                                  setPortfolioProjectsForm({
                                    ...p,
                                    technologies: Array.isArray(p.technologies)
                                      ? p.technologies
                                      : Array.isArray(p.tech)
                                      ? p.tech
                                      : [],
                                  });
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newProjects = formData.siteData.portfolio.projects.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    siteData: {
                                      ...formData.siteData,
                                      portfolio: { ...formData.siteData.portfolio, projects: newProjects },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Title"
                      value={portfolioProjectsForm.title}
                      onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, title: value })}
                    />
                    <Textarea
                      label="Description"
                      value={portfolioProjectsForm.description}
                      onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, description: value })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFilePortfolioForm(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {selectedFilePortfolioForm && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(selectedFilePortfolioForm)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                      {portfolioProjectsForm.image && !selectedFilePortfolioForm && (
                        <div className="mt-2">
                          <img
                            src={resolveImageUrl(portfolioProjectsForm.image)}
                            alt="Current"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                    <Input
                      label="Tech Stack"
                      value={portfolioProjectsForm.technologies.join(', ')}
                      onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, technologies: value.split(', ').filter(Boolean) })}
                    />
                    <div className="flex gap-2">
                      {portfolioProjectsEditingIndex !== null ? (
                        <>
                          <button
                            onClick={async () => {
                              if (selectedFilePortfolioForm) {
                                try {
                                  const filename = await uploadFile(selectedFilePortfolioForm);
                                  portfolioProjectsForm.image = filename;
                                } catch (err) {
                                  alert('Image upload failed');
                                  return;
                                }
                                setSelectedFilePortfolioForm(null);
                              }
                              const newProjects = [...formData.siteData.portfolio.projects];
                              // Convert `technologies` -> `tech` for backend compatibility
                              const toSave = {
                                title: portfolioProjectsForm.title,
                                description: portfolioProjectsForm.description,
                                image: portfolioProjectsForm.image,
                                tech: Array.isArray(portfolioProjectsForm.technologies) ? portfolioProjectsForm.technologies : [],
                                externalLink: portfolioProjectsForm.externalLink,
                              };
                              newProjects[portfolioProjectsEditingIndex] = toSave;
                              setFormData({
                                ...formData,
                                siteData: {
                                  ...formData.siteData,
                                  portfolio: { ...formData.siteData.portfolio, projects: newProjects },
                                },
                              });
                              setPortfolioProjectsEditingIndex(null);
                              setPortfolioProjectsForm({ title: '', description: '', image: '', technologies: [], externalLink: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setPortfolioProjectsEditingIndex(null);
                              setPortfolioProjectsForm({ title: '', description: '', image: '', technologies: [], externalLink: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            if (selectedFilePortfolioForm) {
                              try {
                                const filename = await uploadFile(selectedFilePortfolioForm);
                                portfolioProjectsForm.image = filename;
                              } catch (err) {
                                alert('Image upload failed');
                                return;
                              }
                              setSelectedFilePortfolioForm(null);
                            }
                            // Convert `technologies` -> `tech` for backend compatibility
                            const toSave = {
                              title: portfolioProjectsForm.title,
                              description: portfolioProjectsForm.description,
                              image: portfolioProjectsForm.image,
                              tech: Array.isArray(portfolioProjectsForm.technologies) ? portfolioProjectsForm.technologies : [],
                              externalLink: portfolioProjectsForm.externalLink,
                            };
                            const newProjects = [...formData.siteData.portfolio.projects, toSave];
                            setFormData({
                              ...formData,
                              siteData: {
                                ...formData.siteData,
                                portfolio: { ...formData.siteData.portfolio, projects: newProjects },
                              },
                            });
                            setPortfolioProjectsForm({ title: '', description: '', image: '', technologies: [], externalLink: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Project
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
                 )}
                 {activeSection === 'Contact' && (
                <Section title="Contact">
                  <Input
                    label="Title"
                    value={formData.siteData.contact.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          contact: { ...formData.siteData.contact, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.siteData.contact.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          contact: { ...formData.siteData.contact, subtitle: value },
                        },
                      })
                    }
                  />
                  <Input
                    label="Email"
                    value={formData.siteData.contact.email}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          contact: { ...formData.siteData.contact, email: value },
                        },
                      })
                    }
                  />
                  <Input
                    label="Phone"
                    value={formData.siteData.contact.phone}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          contact: { ...formData.siteData.contact, phone: value },
                        },
                      })
                    }
                  />
                  <Input
                    label="Address Line 1"
                    value={formData.siteData.contact.address.line1}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          contact: {
                            ...formData.siteData.contact,
                            address: { ...formData.siteData.contact.address, line1: value },
                          },
                        },
                      })
                    }
                  />
                  <Input
                    label="Address Line 2"
                    value={formData.siteData.contact.address.line2}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        siteData: {
                          ...formData.siteData,
                          contact: {
                            ...formData.siteData.contact,
                            address: { ...formData.siteData.contact.address, line2: value },
                          },
                        },
                      })
                    }
                  />
                </Section>
                 )}
              </>
            )}

            {/* ABOUT */}
            {activePage === 'about' && formData && (
              <>
              {activeSection === 'Hero' && (
                <Section title="Hero">
                  <Input
                    label="Title"
                    value={formData.aboutPageData.hero.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        aboutPageData: {
                          ...formData.aboutPageData,
                          hero: { ...formData.aboutPageData.hero, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.aboutPageData.hero.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        aboutPageData: {
                          ...formData.aboutPageData,
                          hero: { ...formData.aboutPageData.hero, subtitle: value },
                        },
                      })
                    }
                  />
                </Section>
              )}
              {activeSection === 'Stats' && (
                <Section title="Stats">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.siteData.about.stats.map((stat: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.label}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.value}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {stat.icon ? (
                                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: stat.icon }} />
                              ) : (
                                <span className="text-sm text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setAboutStatsEditingIndex(index);
                                  setAboutStatsForm(stat);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newStats = formData.siteData.about.stats.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    siteData: {
                                      ...formData.siteData,
                                      about: { ...formData.siteData.about, stats: newStats },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Label"
                      value={aboutStatsForm.label}
                      onChange={(value) => setAboutStatsForm({ ...aboutStatsForm, label: value })}
                    />
                    <Input
                      label="Value"
                      value={aboutStatsForm.value}
                      onChange={(value) => setAboutStatsForm({ ...aboutStatsForm, value: value })}
                    />
                    <Textarea
                      label="Icon (paste SVG)"
                      value={aboutStatsForm.icon}
                      onChange={(value) => setAboutStatsForm({ ...aboutStatsForm, icon: value })}
                    />
                    <div className="flex gap-2">
                      {aboutStatsEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newStats = [...(formData.aboutPageData?.stats || [])];
                              newStats[aboutStatsEditingIndex] = aboutStatsForm;
                              const newForm = { ...formData, aboutPageData: { ...formData.aboutPageData, stats: newStats } };
                              setFormData(newForm);
                              console.log('About stats edited — new aboutPageData.stats:', newStats);
                              setAboutStatsEditingIndex(null);
                              setAboutStatsForm({ label: '', value: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setAboutStatsEditingIndex(null);
                              setAboutStatsForm({ label: '', value: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newStats = [...(formData.aboutPageData?.stats || []), aboutStatsForm];
                            const newForm = { ...formData, aboutPageData: { ...formData.aboutPageData, stats: newStats } };
                            setFormData(newForm);
                            console.log('About stat added — new aboutPageData.stats:', newStats);
                            setAboutStatsForm({ label: '', value: '', icon: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Stat
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
              {activeSection === 'Company' && (
                <Section title="Company">
                  <Input
                    label="Title"
                    value={formData.aboutPageData.company.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        aboutPageData: {
                          ...formData.aboutPageData,
                          company: { ...formData.aboutPageData.company, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Description"
                    value={formData.aboutPageData.company.description}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        aboutPageData: {
                          ...formData.aboutPageData,
                          company: { ...formData.aboutPageData.company, description: value },
                        },
                      })
                    }
                  />
                </Section>
              )}
              {activeSection === 'Core Services' && (
                <Section title="Core Services">
                  <Input
                    label="Title"
                    value={formData.aboutPageData.coreServices.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        aboutPageData: {
                          ...formData.aboutPageData,
                          coreServices: { ...formData.aboutPageData.coreServices, title: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.aboutPageData.coreServices.items.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.points.join(', ')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {typeof item.icon === 'string' && item.icon.trim().startsWith('<svg') ? (
                                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: item.icon }} />
                              ) : (
                                <span className="text-sm text-gray-700">{item.icon}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setCoreServicesEditingIndex(index);
                                  setCoreServicesForm(item);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newItems = formData.aboutPageData.coreServices.items.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    aboutPageData: {
                                      ...formData.aboutPageData,
                                      coreServices: { ...formData.aboutPageData.coreServices, items: newItems },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Title"
                      value={coreServicesForm.title}
                      onChange={(value) => setCoreServicesForm({ ...coreServicesForm, title: value })}
                    />
                    <Textarea
                      label="Points (one per line)"
                      value={coreServicesForm.points.join('\n')}
                      onChange={(value) => setCoreServicesForm({ ...coreServicesForm, points: value.split('\n').filter(p => p.trim()) })}
                    />
                    <div className="flex gap-2">
                      {coreServicesEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newItems = [...formData.aboutPageData.coreServices.items];
                              newItems[coreServicesEditingIndex] = coreServicesForm;
                              setFormData({
                                ...formData,
                                aboutPageData: {
                                  ...formData.aboutPageData,
                                  coreServices: { ...formData.aboutPageData.coreServices, items: newItems },
                                },
                              });
                              setCoreServicesEditingIndex(null);
                              setCoreServicesForm({ title: '', points: [] });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setCoreServicesEditingIndex(null);
                              setCoreServicesForm({ title: '', points: [] });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newItems = [...formData.aboutPageData.coreServices.items, coreServicesForm];
                            setFormData({
                              ...formData,
                              aboutPageData: {
                                ...formData.aboutPageData,
                                coreServices: { ...formData.aboutPageData.coreServices, items: newItems },
                              },
                            });
                            setCoreServicesForm({ title: '', points: [] });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Service
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
              {activeSection === 'Closing Note' && (
                <Section title="Closing Note">
                  <Textarea
                    label="Closing Note"
                    value={formData.aboutPageData.closingNote}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        aboutPageData: { ...formData.aboutPageData, closingNote: value },
                      })
                    }
                  />
                </Section>
              )}
              {activeSection === 'Mission Vision' && (
                <Section title="Mission Vision">
                  {formData.aboutPageData.missionVision.map((mv: any, i: number) => (
                    <Card key={i}>
                      <Input
                        label="Title"
                        value={mv.title}
                        onChange={(value) => {
                          const newMv = [...formData.aboutPageData.missionVision];
                          newMv[i].title = value;
                          setFormData({
                            ...formData,
                            aboutPageData: { ...formData.aboutPageData, missionVision: newMv },
                          });
                        }}
                      />
                      <Textarea
                        label="Description"
                        value={mv.description}
                        onChange={(value) => {
                          const newMv = [...formData.aboutPageData.missionVision];
                          newMv[i].description = value;
                          setFormData({
                            ...formData,
                            aboutPageData: { ...formData.aboutPageData, missionVision: newMv },
                          });
                        }}
                      />
                      <button
                        onClick={() => {
                          const newMv = formData.aboutPageData.missionVision.filter((_: any, idx: number) => idx !== i);
                          setFormData({
                            ...formData,
                            aboutPageData: { ...formData.aboutPageData, missionVision: newMv },
                          });
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </Card>
                  ))}
                  <button
                    onClick={() => {
                      const newMv = [...formData.aboutPageData.missionVision, { title: '', description: '' }];
                      setFormData({
                        ...formData,
                        aboutPageData: { ...formData.aboutPageData, missionVision: newMv },
                      });
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Mission/Vision
                  </button>
                </Section>
              )}
              </>
            )}

            {/* PORTFOLIO */}
            {activePage === 'portfolio' && formData && formData.portfolioPageData && (
              <>
              {activeSection === 'Hero' && (
                <Section title="Hero">
                  <Input
                    label="Title"
                    value={formData.portfolioPageData.hero?.title || ''}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        portfolioPageData: {
                          ...formData.portfolioPageData,
                          hero: { ...formData.portfolioPageData.hero, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.portfolioPageData.hero?.subtitle || ''}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        portfolioPageData: {
                          ...formData.portfolioPageData,
                          hero: { ...formData.portfolioPageData.hero, subtitle: value },
                        },
                      })
                    }
                  />
                </Section>
              )}
              {activeSection === 'Projects' && (
                <Section title="Projects">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tech Stack</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.portfolioPageData.projects.map((p: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {p.image && (
                                <img src={resolveImageUrl(p.image)} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(Array.isArray(p.technologies) ? p.technologies : Array.isArray(p.tech) ? p.tech : []).join(', ')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button onClick={() => { setPortfolioProjectsEditingIndex(index); setPortfolioProjectsForm({ ...p, technologies: Array.isArray(p.technologies) ? p.technologies : Array.isArray(p.tech) ? p.tech : [] }); }} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">Edit</button>
                              <button onClick={() => { const newProjects = formData.portfolioPageData.projects.filter((_: any, idx: number) => idx !== index); setFormData({ ...formData, portfolioPageData: { ...formData.portfolioPageData, projects: newProjects } }); }} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input label="Title" value={portfolioProjectsForm.title} onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, title: value })} />
                    <Textarea label="Description" value={portfolioProjectsForm.description} onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, description: value })} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      <input type="file" accept="image/*" onChange={(e) => setSelectedFilePortfolioForm(e.target.files?.[0] || null)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      {selectedFilePortfolioForm && (
                        <div className="mt-2">
                          <img src={URL.createObjectURL(selectedFilePortfolioForm)} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
                        </div>
                      )}
                      {portfolioProjectsForm.image && !selectedFilePortfolioForm && (
                        <div className="mt-2">
                          <img src={resolveImageUrl(portfolioProjectsForm.image)} alt="Current" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
                        </div>
                      )}
                    </div>
                    <Input label="Tech Stack" value={portfolioProjectsForm.technologies.join(', ')} onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, technologies: value.split(', ').filter(Boolean) })} />
                    <Input label="External Link" value={portfolioProjectsForm.externalLink} onChange={(value) => setPortfolioProjectsForm({ ...portfolioProjectsForm, externalLink: value })} />
                    <div className="flex gap-2">
                      {portfolioProjectsEditingIndex !== null ? (
                        <>
                          <button onClick={async () => {
                            if (selectedFilePortfolioForm) {
                                const filename = await uploadFile(selectedFilePortfolioForm);
                                portfolioProjectsForm.image = filename;
                                setSelectedFilePortfolioForm(null);
                              }
                            const newProjects = [...formData.portfolioPageData.projects];
                            const toSave = {
                              title: portfolioProjectsForm.title,
                              description: portfolioProjectsForm.description,
                              image: portfolioProjectsForm.image,
                              tech: Array.isArray(portfolioProjectsForm.technologies) ? portfolioProjectsForm.technologies : [],
                              externalLink: portfolioProjectsForm.externalLink,
                            };
                            newProjects[portfolioProjectsEditingIndex] = toSave;
                            setFormData({ ...formData, portfolioPageData: { ...formData.portfolioPageData, projects: newProjects } });
                            setPortfolioProjectsEditingIndex(null);
                            setPortfolioProjectsForm({ title: '', description: '', image: '', technologies: [], externalLink: '' });
                          }} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Save Changes</button>
                          <button onClick={() => { setPortfolioProjectsEditingIndex(null); setPortfolioProjectsForm({ title: '', description: '', image: '', technologies: [], externalLink: '' }); setSelectedFilePortfolioForm(null); }} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Cancel</button>
                        </>
                      ) : (
                        <button onClick={async () => {
                          if (selectedFilePortfolioForm) {
                            const filename = await uploadFile(selectedFilePortfolioForm);
                            portfolioProjectsForm.image = filename;
                            setSelectedFilePortfolioForm(null);
                          }
                          const toSave = {
                            title: portfolioProjectsForm.title,
                            description: portfolioProjectsForm.description,
                            image: portfolioProjectsForm.image,
                            tech: Array.isArray(portfolioProjectsForm.technologies) ? portfolioProjectsForm.technologies : [],
                            externalLink: portfolioProjectsForm.externalLink,
                          };
                          const newProjects = [...formData.portfolioPageData.projects, toSave];
                          setFormData({ ...formData, portfolioPageData: { ...formData.portfolioPageData, projects: newProjects } });
                          setPortfolioProjectsForm({ title: '', description: '', image: '', technologies: [], externalLink: '' });
                        }} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add Project</button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
              </>
            )}

            {/* CAREERS */}
            {activePage === 'careers' && formData && (
              <>
              {activeSection === 'Hero' && (
                <Section title="Hero">
                  <Input
                    label="Title"
                    value={formData.careersPageData.hero.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          hero: { ...formData.careersPageData.hero, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.careersPageData.hero.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          hero: { ...formData.careersPageData.hero, subtitle: value },
                        },
                      })
                    }
                  />
                  <EditableTable
                    columns={[
                      { key: 'label', label: 'Label', type: 'input' },
                      { key: 'href', label: 'Href', type: 'input' },
                      { key: 'variant', label: 'Variant', type: 'input' },
                    ]}
                    data={formData.careersPageData.hero.cta}
                    onChange={(index, key, value) => {
                      const newCta = [...formData.careersPageData.hero.cta];
                      newCta[index][key] = value;
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          hero: { ...formData.careersPageData.hero, cta: newCta },
                        },
                      });
                    }}
                    onAdd={() => {
                      const newCta = [...formData.careersPageData.hero.cta, { label: '', href: '', variant: '' }];
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          hero: { ...formData.careersPageData.hero, cta: newCta },
                        },
                      });
                    }}
                    onDelete={(index) => {
                      const newCta = formData.careersPageData.hero.cta.filter((_: any, idx: number) => idx !== index);
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          hero: { ...formData.careersPageData.hero, cta: newCta },
                        },
                      });
                    }}
                    addButtonText="Add CTA"
                  />
                </Section>
              )}
              {activeSection === 'Why SGCA' && (
                <Section title="Why SGCA">
                  <Input
                    label="Title"
                    value={formData.careersPageData.whySGCA.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          whySGCA: { ...formData.careersPageData.whySGCA, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.careersPageData.whySGCA.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          whySGCA: { ...formData.careersPageData.whySGCA, subtitle: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.careersPageData.whySGCA.items.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {typeof item.icon === 'string' && item.icon.trim().startsWith('<svg') ? (
                                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: item.icon }} />
                              ) : (
                                <span className="text-sm text-gray-700">{item.icon}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setWhySgcaEditingIndex(index);
                                  setWhySgcaForm(item);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newItems = formData.careersPageData.whySGCA.items.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    careersPageData: {
                                      ...formData.careersPageData,
                                      whySGCA: { ...formData.careersPageData.whySGCA, items: newItems },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Title"
                      value={whySgcaForm.title}
                      onChange={(value) => setWhySgcaForm({ ...whySgcaForm, title: value })}
                    />
                    <Textarea
                      label="Description"
                      value={whySgcaForm.description}
                      onChange={(value) => setWhySgcaForm({ ...whySgcaForm, description: value })}
                    />
                    <Textarea
                      label="Icon (paste SVG or lucide name)"
                      value={whySgcaForm.icon}
                      onChange={(value) => setWhySgcaForm({ ...whySgcaForm, icon: value })}
                    />
                    <div className="flex gap-2">
                      {whySgcaEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newItems = [...formData.careersPageData.whySGCA.items];
                              newItems[whySgcaEditingIndex] = whySgcaForm;
                              setFormData({
                                ...formData,
                                careersPageData: {
                                  ...formData.careersPageData,
                                  whySGCA: { ...formData.careersPageData.whySGCA, items: newItems },
                                },
                              });
                              setWhySgcaEditingIndex(null);
                              setWhySgcaForm({ title: '', description: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setWhySgcaEditingIndex(null);
                              setWhySgcaForm({ title: '', description: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newItems = [...formData.careersPageData.whySGCA.items, whySgcaForm];
                            setFormData({
                              ...formData,
                              careersPageData: {
                                ...formData.careersPageData,
                                whySGCA: { ...formData.careersPageData.whySGCA, items: newItems },
                              },
                            });
                            setWhySgcaForm({ title: '', description: '', icon: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Item
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
              {activeSection === 'Open Roles' && (
                <Section title="Open Roles">
                  <Input
                    label="Title"
                    value={formData.careersPageData.roles.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          roles: { ...formData.careersPageData.roles, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.careersPageData.roles.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          roles: { ...formData.careersPageData.roles, subtitle: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.careersPageData.roles.positions.map((r: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setOpenRolesEditingIndex(index);
                                  setOpenRolesForm(r);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newPositions = formData.careersPageData.roles.positions.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    careersPageData: {
                                      ...formData.careersPageData,
                                      roles: { ...formData.careersPageData.roles, positions: newPositions },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Title"
                      value={openRolesForm.title}
                      onChange={(value) => setOpenRolesForm({ ...openRolesForm, title: value })}
                    />
                    <Input
                      label="Type"
                      value={openRolesForm.type}
                      onChange={(value) => setOpenRolesForm({ ...openRolesForm, type: value })}
                    />
                    <Input
                      label="Location"
                      value={openRolesForm.location}
                      onChange={(value) => setOpenRolesForm({ ...openRolesForm, location: value })}
                    />
                    <Textarea
                      label="Description"
                      value={openRolesForm.description}
                      onChange={(value) => setOpenRolesForm({ ...openRolesForm, description: value })}
                    />
                    <Textarea
                      label="Requirements (one per line)"
                      value={openRolesForm.requirements.join('\n')}
                      onChange={(value) => setOpenRolesForm({ ...openRolesForm, requirements: value.split('\n').filter(req => req.trim()) })}
                    />
                    <Input
                      label="Apply Link"
                      value={openRolesForm.applyLink}
                      onChange={(value) => setOpenRolesForm({ ...openRolesForm, applyLink: value })}
                    />
                    <div className="flex gap-2">
                      {openRolesEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newPositions = [...formData.careersPageData.roles.positions];
                              newPositions[openRolesEditingIndex] = openRolesForm;
                              setFormData({
                                ...formData,
                                careersPageData: {
                                  ...formData.careersPageData,
                                  roles: { ...formData.careersPageData.roles, positions: newPositions },
                                },
                              });
                              setOpenRolesEditingIndex(null);
                              setOpenRolesForm({ title: '', type: '', location: '', description: '', requirements: [], applyLink: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setOpenRolesEditingIndex(null);
                              setOpenRolesForm({ title: '', type: '', location: '', description: '', requirements: [], applyLink: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newPositions = [...formData.careersPageData.roles.positions, openRolesForm];
                            setFormData({
                              ...formData,
                              careersPageData: {
                                ...formData.careersPageData,
                                roles: { ...formData.careersPageData.roles, positions: newPositions },
                              },
                            });
                            setOpenRolesForm({ title: '', type: '', location: '', description: '', requirements: [], applyLink: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Position
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
              {activeSection === 'Benefits' && (
                <Section title="Benefits">
                  <Input
                    label="Title"
                    value={formData.careersPageData.benefits.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          benefits: { ...formData.careersPageData.benefits, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.careersPageData.benefits.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          benefits: { ...formData.careersPageData.benefits, subtitle: value },
                        },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {(formData.careersPageData?.benefits?.items || []).map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {typeof item.icon === 'string' && item.icon.trim().startsWith('<svg') ? (
                                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: item.icon }} />
                              ) : (
                                <span className="text-sm text-gray-700">{item.icon}</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setBenefitsEditingIndex(index);
                                  setBenefitsForm(item);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newItems = (formData.careersPageData?.benefits?.items || []).filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    careersPageData: {
                                      ...formData.careersPageData,
                                      benefits: { ...formData.careersPageData.benefits, items: newItems },
                                    },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Card>
                    <Input
                      label="Title"
                      value={benefitsForm.title}
                      onChange={(value) => setBenefitsForm({ ...benefitsForm, title: value })}
                    />
                    <Textarea
                      label="Icon (paste SVG or lucide name)"
                      value={benefitsForm.icon}
                      onChange={(value) => setBenefitsForm({ ...benefitsForm, icon: value })}
                    />
                    <div className="flex gap-2">
                      {benefitsEditingIndex !== null ? (
                        <>
                          <button
                            onClick={() => {
                              const newItems = [...(formData.careersPageData?.benefits?.items || [])];
                              newItems[benefitsEditingIndex] = benefitsForm;
                              setFormData({
                                ...formData,
                                careersPageData: {
                                  ...formData.careersPageData,
                                  benefits: { ...formData.careersPageData.benefits, items: newItems },
                                },
                              });
                              setBenefitsEditingIndex(null);
                              setBenefitsForm({ title: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setBenefitsEditingIndex(null);
                              setBenefitsForm({ title: '', icon: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const newItems = [...(formData.careersPageData?.benefits?.items || []), benefitsForm];
                            setFormData({
                              ...formData,
                              careersPageData: {
                                ...formData.careersPageData,
                                benefits: { ...formData.careersPageData.benefits, items: newItems },
                              },
                            });
                            setBenefitsForm({ title: '', icon: '' });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Benefit
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
              {activeSection === 'Apply' && (
                <Section title="Apply">
                  <Input
                    label="Title"
                    value={formData.careersPageData.apply.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          apply: { ...formData.careersPageData.apply, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Description"
                    value={formData.careersPageData.apply.description}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          apply: { ...formData.careersPageData.apply, description: value },
                        },
                      })
                    }
                  />
                  <Input
                    label="Email"
                    value={formData.careersPageData.apply.email}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          apply: { ...formData.careersPageData.apply, email: value },
                        },
                      })
                    }
                  />
                  <Input
                    label="CTA Label"
                    value={formData.careersPageData.apply.cta.label}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          apply: { ...formData.careersPageData.apply, cta: { ...formData.careersPageData.apply.cta, label: value } },
                        },
                      })
                    }
                  />
                  <Input
                    label="CTA Href"
                    value={formData.careersPageData.apply.cta.href}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        careersPageData: {
                          ...formData.careersPageData,
                          apply: { ...formData.careersPageData.apply, cta: { ...formData.careersPageData.apply.cta, href: value } },
                        },
                      })
                    }
                  />
                </Section>
                )}
              </>
            )}

            {/* CONTACT */}
            {activePage === 'contact' && formData && (
              <>
              {activeSection === 'Hero' && (
                <Section title="Hero">
                  <Input
                    label="Title"
                    value={formData.contactPageData.hero.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        contactPageData: {
                          ...formData.contactPageData,
                          hero: { ...formData.contactPageData.hero, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.contactPageData.hero.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        contactPageData: {
                          ...formData.contactPageData,
                          hero: { ...formData.contactPageData.hero, subtitle: value },
                        },
                      })
                    }
                  />
                </Section>
              )}
              {activeSection === 'Contact Info' && (
                <Section title="Contact Info">
                  {formData.contactPageData.contactInfo.map((c: any, i: number) => (
                    <Card key={i}>
                      <Input
                        label="Type"
                        value={c.type}
                        onChange={(value) => {
                          const newContactInfo = [...formData.contactPageData.contactInfo];
                          newContactInfo[i].type = value;
                          setFormData({
                            ...formData,
                            contactPageData: { ...formData.contactPageData, contactInfo: newContactInfo },
                          });
                        }}
                      />
                      {typeof c.value === 'string' ? (
                        <Input
                          label="Value"
                          value={c.value}
                          onChange={(value) => {
                            const newContactInfo = [...formData.contactPageData.contactInfo];
                            newContactInfo[i].value = value;
                            setFormData({
                              ...formData,
                              contactPageData: { ...formData.contactPageData, contactInfo: newContactInfo },
                            });
                          }}
                        />
                      ) : (
                        <>
                          <Input
                            label="Line 1"
                            value={c.value.line1}
                            onChange={(value) => {
                              const newContactInfo = [...formData.contactPageData.contactInfo];
                              newContactInfo[i].value = { ...newContactInfo[i].value, line1: value };
                              setFormData({
                                ...formData,
                                contactPageData: { ...formData.contactPageData, contactInfo: newContactInfo },
                              });
                            }}
                          />
                          <Input
                            label="Line 2"
                            value={c.value.line2}
                            onChange={(value) => {
                              const newContactInfo = [...formData.contactPageData.contactInfo];
                              newContactInfo[i].value = { ...newContactInfo[i].value, line2: value };
                              setFormData({
                                ...formData,
                                contactPageData: { ...formData.contactPageData, contactInfo: newContactInfo },
                              });
                            }}
                          />
                        </>
                      )}
                      <button
                        onClick={() => {
                          const newContactInfo = formData.contactPageData.contactInfo.filter((_: any, idx: number) => idx !== i);
                          setFormData({
                            ...formData,
                            contactPageData: { ...formData.contactPageData, contactInfo: newContactInfo },
                          });
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </Card>
                  ))}
                  <button
                    onClick={() => {
                      const newContactInfo = [...formData.contactPageData.contactInfo, { type: '', value: '' }];
                      setFormData({
                        ...formData,
                        contactPageData: { ...formData.contactPageData, contactInfo: newContactInfo },
                      });
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Contact Info
                  </button>
                </Section>
              )}
              </>
            )}

            {/* LEADERSHIP */}
            {activePage === 'leadership' && formData && (
              <>
              {activeSection === 'Hero' && (
                <Section title="Hero">
                  <Input
                    label="Title"
                    value={formData.leadershipPageData.hero.title}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        leadershipPageData: {
                          ...formData.leadershipPageData,
                          hero: { ...formData.leadershipPageData.hero, title: value },
                        },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.leadershipPageData.hero.subtitle}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        leadershipPageData: {
                          ...formData.leadershipPageData,
                          hero: { ...formData.leadershipPageData.hero, subtitle: value },
                        },
                      })
                    }
                  />
                </Section>
              )}
              {activeSection === 'Leadership Team' && (
                <Section title="Leadership Team">
                  <Input
                    label="Title"
                    value={formData.leadershipPageData.title || ''}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        leadershipPageData: { ...formData.leadershipPageData, title: value },
                      })
                    }
                  />
                  <Textarea
                    label="Subtitle"
                    value={formData.leadershipPageData.subtitle || ''}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        leadershipPageData: { ...formData.leadershipPageData, subtitle: value },
                      })
                    }
                  />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.leadershipPageData.members.map((member: any, index: number) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {member.image && (
                                <img
                                  src={resolveImageUrl(member.image)}
                                  alt="Preview"
                                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                />
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setLeadershipEditingIndex(index);
                                  setLeadershipForm(member);
                                }}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const newMembers = formData.leadershipPageData.members.filter((_: any, idx: number) => idx !== index);
                                  setFormData({
                                    ...formData,
                                    leadershipPageData: { ...formData.leadershipPageData, members: newMembers },
                                  });
                                }}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Card>
                    <Input
                      label="Name"
                      value={leadershipForm.name}
                      onChange={(value) => setLeadershipForm({ ...leadershipForm, name: value })}
                    />
                    <Input
                      label="Role"
                      value={leadershipForm.role}
                      onChange={(value) => setLeadershipForm({ ...leadershipForm, role: value })}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFileLeadershipForm(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                      {selectedFileLeadershipForm && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(selectedFileLeadershipForm)}
                            alt="Preview"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                      {leadershipForm.image && !selectedFileLeadershipForm && (
                        <div className="mt-2">
                          <img
                            src={resolveImageUrl(leadershipForm.image)}
                            alt="Current"
                            className="w-16 h-16 rounded-full object-cover border border-gray-300"
                          />
                        </div>
                      )}
                    </div>
                    <Textarea
                      label="Bio"
                      value={leadershipForm.bio}
                      onChange={(value) => setLeadershipForm({ ...leadershipForm, bio: value })}
                    />
                    <Input
                      label="LinkedIn"
                      value={leadershipForm.socials.linkedin}
                      onChange={(value) => setLeadershipForm({ ...leadershipForm, socials: { ...leadershipForm.socials, linkedin: value } })}
                    />
                    <div className="flex gap-2">
                      {leadershipEditingIndex !== null ? (
                        <>
                          <button
                            onClick={async () => {
                              const updated = { ...leadershipForm } as any;
                              if (selectedFileLeadershipForm) {
                                try {
                                  const filename = await uploadFile(selectedFileLeadershipForm);
                                  updated.image = filename;
                                } catch (err) {
                                  alert('Image upload failed');
                                  return;
                                }
                                setSelectedFileLeadershipForm(null);
                              }
                              const newMembers = [...formData.leadershipPageData.members];
                              newMembers[leadershipEditingIndex] = updated;
                              setFormData({
                                ...formData,
                                leadershipPageData: { ...formData.leadershipPageData, members: newMembers },
                              });
                              setLeadershipEditingIndex(null);
                              setLeadershipForm({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Update Member
                          </button>
                          <button
                            onClick={() => {
                              setLeadershipEditingIndex(null);
                              setLeadershipForm({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });
                              setSelectedFileLeadershipForm(null);
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={async () => {
                            const toAdd = { ...leadershipForm } as any;
                            if (selectedFileLeadershipForm) {
                              try {
                                const filename = await uploadFile(selectedFileLeadershipForm);
                                toAdd.image = filename;
                              } catch (err) {
                                alert('Image upload failed');
                                return;
                              }
                              setSelectedFileLeadershipForm(null);
                            }
                            const newMembers = [...formData.leadershipPageData.members, toAdd];
                            setFormData({
                              ...formData,
                              leadershipPageData: { ...formData.leadershipPageData, members: newMembers },
                            });
                            setLeadershipForm({ name: '', role: '', image: '', bio: '', socials: { linkedin: '' } });
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Add Member
                        </button>
                      )}
                    </div>
                  </Card>
                </Section>
              )}
            </>
          )}
          </div>

          </div>
        )}
      </main>

      {/* SAVE BUTTON */}
      {formData && activePage !== 'dashboard' && (
        <div className="border-t bg-white p-4 text-right">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  </div>
);
}
