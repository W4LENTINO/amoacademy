import { apiClient, APIResponse } from '../lib/apiClient';
import { BlogPost } from '../types';

class BlogService {
  private readonly table = 'blog_posts';

  async listarPosts(): Promise<APIResponse<BlogPost[]>> {
    return apiClient.findMany<BlogPost>(this.table, {
      order: { column: 'created_at', ascending: false }
    });
  }

  async buscarPostPorId(id: string): Promise<APIResponse<BlogPost>> {
    return apiClient.findById<BlogPost>(this.table, id);
  }

  async criarPost(data: any): Promise<APIResponse<BlogPost>> {
    return apiClient.create<BlogPost>(this.table, data, { returning: true });
  }

  async atualizarPost(id: string, data: any): Promise<APIResponse<BlogPost>> {
    return apiClient.update<BlogPost>(this.table, id, data, { returning: true });
  }

  async deletePost(id: string): Promise<APIResponse<null>> {
    return apiClient.delete(this.table, id);
  }
}

export const blogService = new BlogService();