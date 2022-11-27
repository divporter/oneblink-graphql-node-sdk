import { Field, ObjectType } from "type-graphql";
import { JSONScalar } from "../JSON";

@ObjectType()
export class SubmissionAttachmentMetaResponse {
  @Field({
    nullable: true,
    description: "Indicates that a range of bytes was specified.",
  })
  AcceptRanges?: string;

  @Field({
    nullable: true,
    description: "The archive state of the head object.",
  })
  ArchiveStatus?: string;

  @Field({
    nullable: true,
    description:
      "Indicates whether the object uses an S3 Bucket Key for server-side encryption with Amazon Web Services KMS (SSE-KMS)",
  })
  BucketKeyEnabled?: boolean;

  @Field({
    nullable: true,
    description: "Specifies caching behavior along the request/reply chain.",
  })
  CacheControl?: string;

  @Field({
    nullable: true,
    description:
      "The base64-encoded, 32-bit CRC32 checksum of the object. This will only be present if it was uploaded with the object. With multipart uploads, this may not be a checksum value of the object. For more information about how checksums are calculated with multipart uploads, see  Checking object integrity in the Amazon S3 User Guide.",
  })
  ChecksumCRC32?: string;

  @Field({
    nullable: true,
    description:
      "The base64-encoded, 32-bit CRC32C checksum of the object. This will only be present if it was uploaded with the object. With multipart uploads, this may not be a checksum value of the object. For more information about how checksums are calculated with multipart uploads, see  Checking object integrity in the Amazon S3 User Guide.",
  })
  ChecksumCRC32C?: string;

  @Field({
    nullable: true,
    description:
      "The base64-encoded, 160-bit SHA-1 digest of the object. This will only be present if it was uploaded with the object. With multipart uploads, this may not be a checksum value of the object. For more information about how checksums are calculated with multipart uploads, see  Checking object integrity in the Amazon S3 User Guide.",
  })
  ChecksumSHA1?: string;

  @Field({
    nullable: true,
    description:
      "The base64-encoded, 256-bit SHA-256 digest of the object. This will only be present if it was uploaded with the object. With multipart uploads, this may not be a checksum value of the object. For more information about how checksums are calculated with multipart uploads, see  Checking object integrity in the Amazon S3 User Guide.",
  })
  ChecksumSHA256?: string;

  @Field({
    nullable: true,
    description: "Specifies presentational information for the object.",
  })
  ContentDisposition?: string;

  @Field({
    nullable: true,
    description:
      "Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field.",
  })
  ContentEncoding?: string;

  @Field({
    nullable: true,
    description: "The language the content is in.",
  })
  ContentLanguage?: string;

  @Field({
    nullable: true,
    description: "Size of the body in bytes.",
  })
  ContentLength?: string;

  @Field({
    nullable: true,
    description:
      "A standard MIME type describing the format of the object data.",
  })
  ContentType?: string;

  @Field({
    nullable: true,
    description:
      "Specifies whether the object retrieved was (true) or was not (false) a Delete Marker. If false, this response header does not appear in the response.",
  })
  DeleteMarker?: string;

  @Field({
    nullable: true,
    description:
      "An entity tag (ETag) is an opaque identifier assigned by a web server to a specific version of a resource found at a URL.",
  })
  ETag?: string;

  @Field({
    nullable: true,
    description:
      "If the object expiration is configured (see PUT Bucket lifecycle), the response includes this header. It includes the expiry-date and rule-id key-value pairs providing object expiration information. The value of the rule-id is URL-encoded.",
  })
  Expiration?: string;

  @Field({
    nullable: true,
    description:
      "The date and time at which the object is no longer cacheable.",
  })
  Expires?: Date;

  @Field({
    nullable: true,
    description: "Creation date of the object.",
  })
  LastModified?: Date;

  @Field((returns) => JSONScalar, {
    nullable: true,
    description: "A map of metadata to store with the object in S3.",
  })
  Metadata?: Record<string, string>;

  @Field({
    nullable: true,
    description:
      "This is set to the number of metadata entries not returned in x-amz-meta headers. This can happen if you create metadata using an API like SOAP that supports more flexible metadata than the REST API. For example, using SOAP, you can create metadata whose values are not legal HTTP headers.",
  })
  MissingMeta?: number;

  @Field({
    nullable: true,
    description:
      "Specifies whether a legal hold is in effect for this object. This header is only returned if the requester has the s3:GetObjectLegalHold permission. This header is not returned if the specified version of this object has never had a legal hold applied. For more information about S3 Object Lock, see Object Lock.",
  })
  ObjectLockLegalHoldStatus?: string;

  @Field({
    nullable: true,
    description:
      "The Object Lock mode, if any, that's in effect for this object. This header is only returned if the requester has the s3:GetObjectRetention permission. For more information about S3 Object Lock, see Object Lock.",
  })
  ObjectLockMode?: string;

  @Field({
    nullable: true,
    description:
      "The date and time when the Object Lock retention period expires. This header is only returned if the requester has the s3:GetObjectRetention permission.",
  })
  ObjectLockRetainUntilDate?: Date;

  @Field({
    nullable: true,
    description:
      "The count of parts this object has. This value is only returned if you specify partNumber in your request and the object was uploaded as a multipart upload.",
  })
  PartsCount?: Date;

  @Field({
    nullable: true,
    description:
      "Amazon S3 can return this header if your request involves a bucket that is either a source or a destination in a replication rule. In replication, you have a source bucket on which you configure replication and destination bucket or buckets where Amazon S3 stores object replicas. When you request an object (GetObject) or object metadata (HeadObject) from these buckets, Amazon S3 will return the x-amz-replication-status header in the response as follows:    If requesting an object from the source bucket, Amazon S3 will return the x-amz-replication-status header if the object in your request is eligible for replication.  For example, suppose that in your replication configuration, you specify object prefix TaxDocs requesting Amazon S3 to replicate objects with key prefix TaxDocs. Any objects you upload with this key name prefix, for example TaxDocs/document1.pdf, are eligible for replication. For any object request with this key name prefix, Amazon S3 will return the x-amz-replication-status header with value PENDING, COMPLETED or FAILED indicating object replication status.    If requesting an object from a destination bucket, Amazon S3 will return the x-amz-replication-status header with value REPLICA if the object in your request is a replica that Amazon S3 created and there is no replica modification replication in progress.    When replicating objects to multiple destination buckets, the x-amz-replication-status header acts differently. The header of the source object will only return a value of COMPLETED when replication is successful to all destinations. The header will remain at value PENDING until replication has completed for all destinations. If one or more destinations fails replication the header will return FAILED.    For more information, see Replication.",
  })
  ReplicationStatus?: string;

  @Field({ nullable: true })
  RequestCharged?: string;

  @Field({
    nullable: true,
    description: `If the object is an archived object (an object whose storage class is GLACIER), the response includes this header if either the archive restoration is in progress (see RestoreObject or an archive copy is already restored.  If an archive copy is already restored, the header value indicates when Amazon S3 is scheduled to delete the object copy. For example:  x-amz-restore: ongoing-request="false", expiry-date="Fri, 21 Dec 2012 00:00:00 GMT"  If the object restoration is in progress, the header returns the value ongoing-request="true". For more information about archiving objects, see Transitioning Objects: General Considerations.`,
  })
  Restore?: string;

  @Field({
    nullable: true,
    description:
      "If server-side encryption with a customer-provided encryption key was requested, the response will include this header confirming the encryption algorithm used.",
  })
  SSECustomerAlgorithm?: string;

  @Field({
    nullable: true,
    description:
      "If server-side encryption with a customer-provided encryption key was requested, the response will include this header to provide round-trip message integrity verification of the customer-provided encryption key.",
  })
  SSECustomerKeyMD5?: string;

  @Field({
    nullable: true,
    description:
      "If present, specifies the ID of the Amazon Web Services Key Management Service (Amazon Web Services KMS) symmetric customer managed key that was used for the object.",
  })
  SSEKMSKeyId?: string;

  @Field({
    nullable: true,
    description:
      "If the object is stored using server-side encryption either with an Amazon Web Services KMS key or an Amazon S3-managed encryption key, the response includes this header with the value of the server-side encryption algorithm used when storing this object in Amazon S3 (for example, AES256, aws:kms).",
  })
  ServerSideEncryption?: string;

  @Field({
    nullable: true,
    description:
      "Provides storage class information of the object. Amazon S3 returns this header for all objects except for S3 Standard storage class objects. For more information, see Storage Classes.",
  })
  StorageClass?: string;

  @Field({
    nullable: true,
    description: "Version of the object.",
  })
  VersionId?: string;

  @Field({
    nullable: true,
    description:
      "If the bucket is configured as a website, redirects requests for this object to another object in the same bucket or to an external URL. Amazon S3 stores the value of this header in the object metadata.",
  })
  WebsiteRedirectLocation?: string;
}
