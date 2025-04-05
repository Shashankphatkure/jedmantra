'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function CourseCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '', slug: '', icon: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Check if course_categories table exists
      const { error: tableError } = await supabase
        .from('course_categories')
        .select('id')
        .limit(1);
        
      if (tableError && tableError.code === '42P01') {
        // Table doesn't exist, create it
        await createCategoriesTable();
        await seedCategoriesData();
      } else {
        // Table exists, fetch categories
        const { data, error } = await supabase
          .from('course_categories')
          .select('*')
          .order('name', { ascending: true });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          // Table exists but no data
          await seedCategoriesData();
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createCategoriesTable = async () => {
    try {
      // Create the categories table using SQL
      const { error } = await supabase.rpc('create_course_categories_table');
      
      if (error) {
        // If RPC doesn't exist, create the table using a different approach
        // This is a simplified approach - in a real app, you'd use migrations
        await supabase.auth.getSession();
        
        // For demo purposes, we'll just show a toast and use mock data
        toast.error('Could not create categories table. Using mock data instead.');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error creating categories table:', error);
      return false;
    }
  };

  const seedCategoriesData = async () => {
    // Seed with initial categories data
    const initialCategories = [
      {
        name: 'Web Development',
        description: 'Learn to build websites and web applications',
        slug: 'web-development',
        icon: 'code',
        created_at: new Date().toISOString()
      },
      {
        name: 'Data Science',
        description: 'Master data analysis and machine learning',
        slug: 'data-science',
        icon: 'chart-bar',
        created_at: new Date().toISOString()
      },
      {
        name: 'Business',
        description: 'Develop business and entrepreneurship skills',
        slug: 'business',
        icon: 'briefcase',
        created_at: new Date().toISOString()
      },
      {
        name: 'Design',
        description: 'Learn graphic design, UX/UI, and more',
        slug: 'design',
        icon: 'pencil',
        created_at: new Date().toISOString()
      },
    ];

    try {
      // Try to insert the data
      const { error } = await supabase
        .from('course_categories')
        .insert(initialCategories);

      if (error) {
        // If insert fails, use mock data
        console.error('Error seeding categories data:', error);
        setCategories(initialCategories.map((category, index) => ({ 
          id: index + 1, 
          ...category 
        })));
      } else {
        // Fetch the inserted data
        const { data } = await supabase
          .from('course_categories')
          .select('*')
          .order('name', { ascending: true });
          
        setCategories(data);
      }
    } catch (error) {
      console.error('Error seeding categories data:', error);
      // Use mock data as fallback
      setCategories(initialCategories.map((category, index) => ({ 
        id: index + 1, 
        ...category 
      })));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        [name]: value
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value
      });
    }
  };

  const generateSlug = (name) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    
    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        name,
        slug: generateSlug(name)
      });
    } else {
      setNewCategory({
        ...newCategory,
        name,
        slug: generateSlug(name)
      });
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategory.name) {
      toast.error('Category name is required');
      return;
    }
    
    try {
      setLoading(true);
      
      const category = {
        ...newCategory,
        created_at: new Date().toISOString()
      };
      
      // Add to database
      const { data, error } = await supabase
        .from('course_categories')
        .insert(category)
        .select();
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setCategories([...categories, data[0]]);
      
      // Reset form
      setNewCategory({ name: '', description: '', slug: '', icon: '' });
      setShowForm(false);
      
      toast.success('Category created successfully');
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category);
    setShowForm(false);
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  const updateCategory = async () => {
    if (!editingCategory.name) {
      toast.error('Category name is required');
      return;
    }
    
    try {
      setLoading(true);
      
      // Update in database
      const { error } = await supabase
        .from('course_categories')
        .update({
          name: editingCategory.name,
          description: editingCategory.description,
          slug: editingCategory.slug,
          icon: editingCategory.icon
        })
        .eq('id', editingCategory.id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setCategories(categories.map(category => 
        category.id === editingCategory.id ? editingCategory : category
      ));
      
      setEditingCategory(null);
      toast.success('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Delete from database
      const { error } = await supabase
        .from('course_categories')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setCategories(categories.filter(category => category.id !== id));
      
      if (editingCategory && editingCategory.id === id) {
        setEditingCategory(null);
      }
      
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Course Categories</h1>
              <p className="mt-2 text-blue-100">
                Manage categories for courses
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingCategory(null);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Category
              </button>
              <button
                onClick={fetchCategories}
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* New Category Form */}
        {showForm && !loading && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Category</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Create a new course category
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={createCategory}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Category Name *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={newCategory.name}
                        onChange={handleNameChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. Programming"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                      Slug
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="slug"
                        id="slug"
                        value={newCategory.slug}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. programming"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      URL-friendly version of the name. Auto-generated but can be edited.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={newCategory.description}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Brief description of the category"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                      Icon
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="icon"
                        id="icon"
                        value={newCategory.icon}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. code"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Icon name from Heroicons or other icon library
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories List */}
        {!loading && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Course Categories</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {categories.length} categories available
              </p>
            </div>
            {categories.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new category.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Category
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Icon
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        {editingCategory && editingCategory.id === category.id ? (
                          // Editing mode
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                name="name"
                                value={editingCategory.name}
                                onChange={handleNameChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                name="description"
                                value={editingCategory.description}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                name="slug"
                                value={editingCategory.slug}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="text"
                                name="icon"
                                value={editingCategory.icon}
                                onChange={handleInputChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={updateCategory}
                                  className="text-green-600 hover:text-green-900"
                                  title="Save"
                                >
                                  <CheckIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="text-gray-600 hover:text-gray-900"
                                  title="Cancel"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          // View mode
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{category.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500">{category.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{category.slug}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{category.icon}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => startEditing(category)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Edit"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => deleteCategory(category.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Delete"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
