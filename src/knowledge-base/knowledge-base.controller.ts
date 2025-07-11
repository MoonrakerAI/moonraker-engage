import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { KnowledgeBaseService } from './knowledge-base.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { logAuditAction } from '../audit/audit.service'; // Import your audit logging service

@Controller('knowledge-base')
@UseGuards(JwtAuthGuard)
export class KnowledgeBaseController {
  constructor(private knowledgeBaseService: KnowledgeBaseService) {}

  @Post('documents')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file, @Req() req) {
    const userId = req.user.id;
    try {
      // Document upload logic here
      const document = await this.knowledgeBaseService.uploadDocument(userId, file);

      // Log successful upload
      await logAuditAction(userId, 'UPLOAD_DOCUMENT', {
        actionDetails: {
          type: 'UPLOAD_DOCUMENT',
          target: {
            type: 'Document',
            id: document.id, // Assuming the uploadDocument service returns the document with an ID
          },
          details: {
            filename: file.originalname,
            bucket: 'knowledge-base-documents', // Specify the actual bucket name
          },
          status: 'Success',
        },
      });

      return document;
    } catch (error) {
      // Log failed upload
      await logAuditAction(userId, 'UPLOAD_DOCUMENT', {
        actionDetails: {
          type: 'UPLOAD_DOCUMENT',
          status: 'Failure',
          details: {
            filename: file.originalname,
            // Avoid logging the bucket on failure if it might reveal internal structure on error
          },
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Delete('documents/:id')
  async deleteDocument(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
     try {
      // Document deletion logic here
      // You might need to fetch the document before deleting to get the filename for logging
      const documentToDelete = await this.knowledgeBaseService.getDocumentById(userId, id); // Assuming you have a getDocumentById method
      await this.knowledgeBaseService.deleteDocument(userId, id);

      // Log successful deletion
      await logAuditAction(userId, 'DELETE_DOCUMENT', {
        actionDetails: {
          type: 'DELETE_DOCUMENT',
          target: {
            type: 'Document',
            id: id,
          },
          details: {
             filename: documentToDelete ? documentToDelete.filename : 'Unknown File', // Log filename if available
          },
          status: 'Success',
        },
      });

      return { success: true };
    } catch (error) {
       // Log failed deletion
      await logAuditAction(userId, 'DELETE_DOCUMENT', {
        actionDetails: {
          type: 'DELETE_DOCUMENT',
          target: {
            type: 'Document',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Post('website-links')
  async addWebsiteLink(@Body() createLinkDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Add website link logic here
      const link = await this.knowledgeBaseService.addWebsiteLink(userId, createLinkDto);

      // Log successful addition
      await logAuditAction(userId, 'ADD_WEBSITE_LINK', {
        actionDetails: {
          type: 'ADD_WEBSITE_LINK',
          target: {
            type: 'WebsiteLink',
            id: link.id, // Assuming the service returns the link with an ID
          },
          details: {
            title: createLinkDto.title, // Log the title for context
          },
          status: 'Success',
        },
      });

      return link;
    } catch (error) {
       // Log failed addition
      await logAuditAction(userId, 'ADD_WEBSITE_LINK', {
        actionDetails: {
          type: 'ADD_WEBSITE_LINK',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put('website-links/:id')
  async updateWebsiteLink(@Param('id') id: string, @Body() updateLinkDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Update website link logic here
      // Fetch old data before update to capture changes
      const oldLink = await this.knowledgeBaseService.getWebsiteLinkById(userId, id); // Assuming getWebsiteLinkById
      const updatedLink = await this.knowledgeBaseService.updateWebsiteLink(userId, id, updateLinkDto);

      // Log successful update
      await logAuditAction(userId, 'UPDATE_WEBSITE_LINK', {
        actionDetails: {
          type: 'UPDATE_WEBSITE_LINK',
          target: {
            type: 'WebsiteLink',
            id: id,
          },
          changes: {
             // Populate changes based on updateLinkDto and oldLink
             // Example: { fieldName: 'title', oldValue: oldLink.title, newValue: updateLinkDto.title }
          },
          status: 'Success',
        },
      });

      return updatedLink;
    } catch (error) {
      // Log failed update
      await logAuditAction(userId, 'UPDATE_WEBSITE_LINK', {
        actionDetails: {
          type: 'UPDATE_WEBSITE_LINK',
          target: {
            type: 'WebsiteLink',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Delete('website-links/:id')
  async deleteWebsiteLink(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
     try {
      // Delete website link logic here
      // Fetch the link before deleting to get the title for logging
      const linkToDelete = await this.knowledgeBaseService.getWebsiteLinkById(userId, id); // Assuming getWebsiteLinkById
      await this.knowledgeBaseService.deleteWebsiteLink(userId, id);

      // Log successful deletion
      await logAuditAction(userId, 'DELETE_WEBSITE_LINK', {
        actionDetails: {
          type: 'DELETE_WEBSITE_LINK',
          target: {
            type: 'WebsiteLink',
            id: id,
          },
          details: {
             title: linkToDelete ? linkToDelete.title : 'Unknown Link', // Log title if available
          },
          status: 'Success',
        },
      });

      return { success: true };
    } catch (error) {
      // Log failed deletion
      await logAuditAction(userId, 'DELETE_WEBSITE_LINK', {
        actionDetails: {
          type: 'DELETE_WEBSITE_LINK',
          target: {
            type: 'WebsiteLink',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Post('faqs')
  async addFaq(@Body() createFaqDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Add FAQ logic here
      const faq = await this.knowledgeBaseService.addFaq(userId, createFaqDto);

      // Log successful addition
      await logAuditAction(userId, 'ADD_FAQ', {
        actionDetails: {
          type: 'ADD_FAQ',
          target: {
            type: 'FAQ',
            id: faq.id, // Assuming the service returns the FAQ with an ID
          },
          details: {
            question: createFaqDto.question ? createFaqDto.question.substring(0, 100) + '...' : 'No Question', // Log a snippet of the question
          },
          status: 'Success',
        },
      });

      return faq;
    } catch (error) {
      // Log failed addition
      await logAuditAction(userId, 'ADD_FAQ', {
        actionDetails: {
          type: 'ADD_FAQ',
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Put('faqs/:id')
  async updateFaq(@Param('id') id: string, @Body() updateFaqDto: any, @Req() req) {
    const userId = req.user.id;
    try {
      // Update FAQ logic here
      // Fetch old data before update to capture changes
      const oldFaq = await this.knowledgeBaseService.getFaqById(userId, id); // Assuming getFaqById
      const updatedFaq = await this.knowledgeBaseService.updateFaq(userId, id, updateFaqDto);

      // Log successful update
      await logAuditAction(userId, 'UPDATE_FAQ', {
        actionDetails: {
          type: 'UPDATE_FAQ',
          target: {
            type: 'FAQ',
            id: id,
          },
          changes: {
             // Populate changes based on updateFaqDto and oldFaq
             // Example: { fieldName: 'answer', oldValue: oldFaq.answer.substring(0, 100) + '...', newValue: updateFaqDto.answer.substring(0, 100) + '...' } - Be mindful of sensitive info in answers
          },
          status: 'Success',
        },
      });

      return updatedFaq;
    } catch (error) {
       // Log failed update
      await logAuditAction(userId, 'UPDATE_FAQ', {
        actionDetails: {
          type: 'UPDATE_FAQ',
          target: {
            type: 'FAQ',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }

  @Delete('faqs/:id')
  async deleteFaq(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
     try {
      // Delete FAQ logic here
       // Fetch the FAQ before deleting to get the question for logging
      const faqToDelete = await this.knowledgeBaseService.getFaqById(userId, id); // Assuming getFaqById
      await this.knowledgeBaseService.deleteFaq(userId, id);

      // Log successful deletion
      await logAuditAction(userId, 'DELETE_FAQ', {
        actionDetails: {
          type: 'DELETE_FAQ',
          target: {
            type: 'FAQ',
            id: id,
          },
          details: {
             question: faqToDelete ? faqToDelete.question.substring(0, 100) + '...' : 'Unknown Question', // Log a snippet of the question
          },
          status: 'Success',
        },
      });

      return { success: true };
    } catch (error) {
      // Log failed deletion
      await logAuditAction(userId, 'DELETE_FAQ', {
        actionDetails: {
          type: 'DELETE_FAQ',
          target: {
            type: 'FAQ',
            id: id,
          },
          status: 'Failure',
          errorMessage: error.message,
        },
      });
      throw error;
    }
  }
}