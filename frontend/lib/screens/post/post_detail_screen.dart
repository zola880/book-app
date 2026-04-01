import 'package:flutter/material.dart';
import '../../models/post_model.dart';
import '../../models/comment_model.dart';
import '../../widgets/comment_tile.dart';

class PostDetailScreen extends StatelessWidget {
  final PostModel post;
  const PostDetailScreen({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    final List<CommentModel> mockComments = [
      CommentModel(id: 'c1', postId: post.id, authorName: 'Alice', content: 'Great read!', createdAt: DateTime.now()),
    ];

    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(post.title, style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text('By ${post.authorName}', style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.grey)),
            const SizedBox(height: 24),
            Text(post.content, style: const TextStyle(fontSize: 18, height: 1.6)),
            const SizedBox(height: 32),
            const Divider(),
            Text('Comments', style: Theme.of(context).textTheme.titleLarge),
            ...mockComments.map((c) => CommentTile(comment: c)),
          ],
        ),
      ),
    );
  }
}
