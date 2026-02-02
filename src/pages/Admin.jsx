import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import imageCompression from 'browser-image-compression';

export default function Admin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);

    // Dashboard state
    const [activeTab, setActiveTab] = useState('gallery'); // 'activities' or 'gallery'
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');
    const [galleryItems, setGalleryItems] = useState([]); // Store fetched photos

    // Gallery Form
    const [photoFile, setPhotoFile] = useState(null);
    const [photoDesc, setPhotoDesc] = useState('');
    const [photoInsta, setPhotoInsta] = useState('');
    const [photoFb, setPhotoFb] = useState('');

    // Activity Form
    const [actName, setActName] = useState('');
    const [actDesc, setActDesc] = useState('');
    const [actIcon, setActIcon] = useState('AcademicCapIcon');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) throw error;
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
            if (session?.user) {
                fetchGalleryItems();
            }
        };

        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchGalleryItems();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setGalleryItems(data);
        } catch (error) {
            console.error("Error fetching gallery:", error);
        }
    };

    const handleDeletePhoto = async (id) => {
        if (!window.confirm("Are you sure you want to delete this photo?")) return;
        try {
            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setGalleryItems(prev => prev.filter(item => item.id !== id));
            alert("Photo deleted!");
        } catch (error) {
            console.error("Error deleting photo:", error);
            alert("Error deleting photo: " + error.message);
        }
    };

    const handleUpdatePhoto = async (id, data) => {
        try {
            const { error } = await supabase
                .from('gallery')
                .update(data)
                .eq('id', id);

            if (error) throw error;
            console.log("Photo updated");
        } catch (error) {
            console.error("Error updating photo:", error);
            alert("Error updating photo");
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleAddPhoto = async (e) => {
        e.preventDefault();
        if (!photoFile) return alert("Please select a file");

        setUploading(true);
        setUploadProgress('Compressing...');

        try {
            // Compression options - Aggressive to save DB space
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1280,
                useWebWorker: true,
                initialQuality: 0.7
            };

            const compressedFile = await imageCompression(photoFile, options);
            setUploadProgress('Encoding...');

            const base64 = await convertBase64(compressedFile);
            setUploadProgress('Saving...');

            const { error } = await supabase
                .from('gallery')
                .insert([
                    {
                        image_url: base64,
                        description: photoDesc,
                        instagram_url: photoInsta,
                        facebook_url: photoFb,
                        created_at: new Date()
                    }
                ]);

            if (error) throw error;

            alert("Photo added successfully!");
            setPhotoFile(null);
            setPhotoDesc('');
            setPhotoInsta('');
            setPhotoFb('');
            setUploadProgress('');
            fetchGalleryItems();
        } catch (error) {
            console.error("Error uploading photo:", error);
            alert("Error uploading photo: " + error.message);
        }
        setUploading(false);
    };

    const handleAddActivity = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('activities')
                .insert([
                    {
                        name: actName,
                        description: actDesc,
                        iconName: actIcon,
                        created_at: new Date()
                    }
                ]);

            if (error) throw error;

            alert("Activity added successfully!");
            setActName('');
            setActDesc('');
        } catch (error) {
            console.error("Error adding activity:", error);
            alert("Error adding activity: " + error.message);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center text-[#5F2167]">Admin Login (Supabase)</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full bg-[#862633] text-white p-2 rounded hover:bg-[#862633]/90">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#5F2167]">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-800">Logout</button>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="flex border-b">
                        <button
                            className={`px-6 py-3 ${activeTab === 'gallery' ? 'bg-[#5F2167] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('gallery')}
                        >
                            Gallery Management
                        </button>
                        <button
                            className={`px-6 py-3 ${activeTab === 'activities' ? 'bg-[#5F2167] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            onClick={() => setActiveTab('activities')}
                        >
                            Activities Management
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'gallery' ? (
                            <div className="space-y-8">
                                {/* Add New Photo Section */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h2 className="text-xl font-semibold mb-4 text-[#5F2167]">Add New Photo</h2>
                                    <form onSubmit={handleAddPhoto} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setPhotoFile(e.target.files[0])}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5F2167]/10 file:text-[#5F2167] hover:file:bg-[#5F2167]/20"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#5F2167] focus:border-transparent"
                                                value={photoDesc}
                                                onChange={(e) => setPhotoDesc(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Instagram Link (Optional)"
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#5F2167] focus:border-transparent"
                                                value={photoInsta}
                                                onChange={(e) => setPhotoInsta(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Facebook Link (Optional)"
                                                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#5F2167] focus:border-transparent"
                                                value={photoFb}
                                                onChange={(e) => setPhotoFb(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={uploading}
                                            className="w-full md:w-auto bg-[#5F2167] text-white px-8 py-2 rounded-lg hover:bg-[#5F2167]/90 disabled:opacity-50 transition-colors"
                                        >
                                            {uploading ? (uploadProgress || 'Processing...') : 'Add Photo'}
                                        </button>
                                    </form>
                                </div>

                                {/* Existing Photos List */}
                                <div>
                                    <h2 className="text-xl font-semibold mb-4 text-[#5F2167]">Manage Gallery ({galleryItems.length})</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {galleryItems.map((item) => (
                                            <div key={item.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                <div className="aspect-video relative group">
                                                    <img src={item.image_url} alt={item.description} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleDeletePhoto(item.id)}
                                                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4 space-y-2">
                                                    <input
                                                        type="text"
                                                        defaultValue={item.description}
                                                        onBlur={(e) => handleUpdatePhoto(item.id, { description: e.target.value })}
                                                        className="w-full text-sm font-medium border-b border-transparent focus:border-[#5F2167] focus:outline-none"
                                                        placeholder="Description"
                                                    />
                                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                                        <input
                                                            type="text"
                                                            defaultValue={item.instagram_url}
                                                            onBlur={(e) => handleUpdatePhoto(item.id, { instagram_url: e.target.value })}
                                                            className="w-full border rounded px-2 py-1"
                                                            placeholder="Instagram URL"
                                                        />
                                                        <input
                                                            type="text"
                                                            defaultValue={item.facebook_url}
                                                            onBlur={(e) => handleUpdatePhoto(item.id, { facebook_url: e.target.value })}
                                                            className="w-full border rounded px-2 py-1"
                                                            placeholder="Facebook URL"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold">Add New Activity</h2>
                                <form onSubmit={handleAddActivity} className="space-y-4 max-w-lg">
                                    <input
                                        type="text"
                                        placeholder="Activity Name"
                                        className="w-full p-2 border rounded"
                                        value={actName}
                                        onChange={(e) => setActName(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        className="w-full p-2 border rounded"
                                        value={actDesc}
                                        onChange={(e) => setActDesc(e.target.value)}
                                    />
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={actIcon}
                                        onChange={(e) => setActIcon(e.target.value)}
                                    >
                                        <option value="AcademicCapIcon">Trainings (AcademicCap)</option>
                                        <option value="RocketLaunchIcon">Projects (Rocket)</option>
                                        <option value="WrenchScrewdriverIcon">Workshops (Wrench)</option>
                                        <option value="UserGroupIcon">Events (UserGroup)</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="bg-[#5F2167] text-white px-6 py-2 rounded hover:bg-[#5F2167]/90"
                                    >
                                        Add Activity
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
