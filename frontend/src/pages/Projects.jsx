import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../hooks/useAuth";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaTimes,
  FaCode,
  FaLink,
  FaImage,
  FaUser,
  FaCalendarAlt
} from "react-icons/fa";

function Projects() {
  const { user, loading } = useAuth();
  const getId = (v) => (v?._id || v?.id || v);
  const userId = getId(user);

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    github: "",
    liveDemo: "",
    technologies: "",
    image: null,
  });

  const getProjects = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.projects)) return data.projects;
    return [];
  };

  useEffect(() => {
    api
      .get("/api/projects")
      .then((data) => setProjects(getProjects(data)))
      .catch((err) => setMessage(err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };

  const clearForm = () => {
    setForm({ title: "", description: "", github: "", liveDemo: "", technologies: "", image: null });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setMessage("You must login first.");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("github", form.github);
      formData.append("liveDemo", form.liveDemo);
      formData.append("technologies", form.technologies);
      if (form.image) formData.append("image", form.image);

      const data = await api.post("/api/projects", formData);
      setProjects((prev) => [data.project || data, ...prev]);
      clearForm();
      setMessage("Project created successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setShowForm(true);
    setForm({
      title: project.title || "",
      description: project.description || "",
      github: project.github || "",
      liveDemo: project.liveDemo || "",
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || "",
      image: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("github", form.github);
      formData.append("liveDemo", form.liveDemo);
      formData.append("technologies", form.technologies);
      if (form.image) formData.append("image", form.image);

      const data = await api.put(`/api/projects/${editingId}`, formData);
      setProjects((prev) => prev.map((p) => (p._id === editingId ? data.project : p)));
      clearForm();
      setMessage("Project updated successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.del(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setMessage("Project deleted successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050505] text-white px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">

        {/* Image Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-green-600/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-500/30">
              <FaCode className="text-2xl sm:text-3xl text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Student <span className="text-green-500">Projects</span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                Showcase your work and learn from others
              </p>
            </div>
          </div>

          {user && (
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) {
                  setEditingId(null);
                  setForm({ title: "", description: "", github: "", liveDemo: "", technologies: "", image: null });
                }
              }}
              className={`
                inline-flex items-center gap-2
                ${showForm 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-2xl hover:shadow-green-500/30'
                }
                px-4 sm:px-6 py-2 sm:py-2.5 
                rounded-lg sm:rounded-xl text-sm font-semibold
                transition-all duration-300 hover:scale-105
              `}
            >
              {showForm ? (
                <>
                  <FaTimes />
                  Cancel
                </>
              ) : (
                <>
                  <FaPlus />
                  New Project
                </>
              )}
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 sm:mb-6 border rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 text-sm ${
            message.includes("success") || message.includes("created") || message.includes("updated") || message.includes("deleted")
              ? 'bg-green-950/50 border-green-500/30 text-green-300' 
              : 'bg-red-950/50 border-red-500/30 text-red-300'
          }`}>
            <span className="text-xl">{message.includes("success") || message.includes("created") || message.includes("updated") || message.includes("deleted") ? '✓' : '⚠'}</span>
            <span className="flex-1">{message}</span>
            <button onClick={() => setMessage("")} className="hover:opacity-70 transition-opacity">
              <FaTimes />
            </button>
          </div>
        )}

        {/* Create/Edit Form */}
        {showForm && user && (
          <div className="mb-6 sm:mb-8 bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
              {editingId ? (
                <>
                  <FaEdit className="text-green-400" />
                  Edit Project
                </>
              ) : (
                <>
                  <FaPlus className="text-green-400" />
                  Submit New Project
                </>
              )}
            </h2>

            <form onSubmit={editingId ? handleUpdate : handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Project Title</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  placeholder="Enter project title..." 
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Description</label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder="Describe your project..." 
                  rows="4" 
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all resize-none"
                  required 
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">GitHub URL</label>
                  <input 
                    name="github" 
                    value={form.github} 
                    onChange={handleChange} 
                    placeholder="https://github.com/username/repo" 
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Live Demo URL</label>
                  <input 
                    name="liveDemo" 
                    value={form.liveDemo} 
                    onChange={handleChange} 
                    placeholder="https://your-project.com" 
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Technologies (comma separated)</label>
                <input 
                  name="technologies" 
                  value={form.technologies} 
                  onChange={handleChange} 
                  placeholder="React, Node, MongoDB, TypeScript" 
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Project Image</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 border border-white/10 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
                    <FaImage className="text-gray-400" />
                    <span className="text-sm text-gray-400">Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </label>
                  {form.image && (
                    <span className="text-xs text-green-400">
                      {form.image.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    bg-gradient-to-r from-green-600 to-green-500 
                    px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-semibold
                    hover:shadow-2xl hover:shadow-green-500/30
                    transition-all duration-300 hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Project' : 'Submit Project'}
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="border border-white/10 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl text-gray-600">📁</div>
              <h3 className="text-xl sm:text-2xl font-semibold">No Projects Yet</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Be the first to showcase your work!
              </p>
              {user && (
                <button
                  onClick={() => {
                    setShowForm(true);
                    setEditingId(null);
                    setForm({ title: "", description: "", github: "", liveDemo: "", technologies: "", image: null });
                  }}
                  className="
                    inline-flex items-center gap-2
                    bg-green-600 px-6 py-3 rounded-xl text-sm font-semibold
                    hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25
                    transition-all duration-300
                  "
                >
                  <FaPlus />
                  Create First Project
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((project) => (
              <div 
                key={project._id} 
                className="
                  group bg-white/[0.04] backdrop-blur-lg 
                  border border-white/10 rounded-xl sm:rounded-2xl 
                  overflow-hidden
                  hover:bg-white/[0.06] hover:border-white/20
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-2xl hover:shadow-green-500/5
                "
              >
                {/* Image */}
                {project.image && (
                  <div className="relative w-full bg-black/40">
                    <div className="relative" style={{ maxHeight: '300px' }}>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto max-h-[300px] object-contain bg-black/60"
                        style={{ minHeight: '150px' }}
                      />
                      <button
                        onClick={() => setSelectedImage(project.image)}
                        className="
                          absolute bottom-3 right-3
                          bg-black/60 hover:bg-black/80
                          backdrop-blur-sm
                          p-2 rounded-lg
                          text-white/70 hover:text-white
                          transition-all duration-200
                          border border-white/10
                          opacity-0 group-hover:opacity-100
                        "
                        title="View full size"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  {/* Title & Author */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FaUser className="text-green-400 text-[10px]" />
                      <span>{project.author?.username || project.author || "Author"}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-1">
                    <FaCalendarAlt />
                    <span>{formatDate(project.createdAt)}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mt-3 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="bg-green-600/20 text-green-400 px-2.5 py-1 rounded-full text-[10px] font-medium border border-green-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-white/10">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors text-sm"
                      >
                        <FaGithub />
                        Code
                      </a>
                    )}

                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors text-sm"
                      >
                        <FaExternalLinkAlt />
                        Demo
                      </a>
                    )}

                    {(user?.role === "admin" || userId === (project.author?._id || project.author)) && (
                      <>
                        <button 
                          onClick={() => handleEdit(project)} 
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)} 
                          className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-sm"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        {projects.length > 0 && (
          <div className="mt-8 sm:mt-10 text-center text-gray-500 text-xs sm:text-sm">
            Showing {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;