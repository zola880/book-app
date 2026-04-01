import 'package:flutter/material.dart';
import '../models/comment_model.dart';

class CommentTile extends StatelessWidget {
  final CommentModel comment;
  const CommentTile({super.key, required this.comment});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      title: Text(comment.authorName, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(comment.content),
    );
  }
}
